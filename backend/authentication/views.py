from pathlib import Path

from .ExtendedKeycloakAdmin import ExtendedKeyCloakAdmin
from backend.OIDCAuthentication import MyOIDCAB

from .serializers import RegisterSerializer, ScoutHierarchySerializer, ZipCodeSerializer, ScoutOrgaLevelSerializer, \
    EatHabitTypeSerializer
from django.db.models import Q
from django_filters import FilterSet, CharFilter
from rest_framework import status, viewsets
from rest_framework.exceptions import PermissionDenied
from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from .models import ScoutHierarchy, ZipCode, ScoutOrgaLevel, EatHabitType
from keycloak import KeycloakAdmin, KeycloakGetError
import environ
from django.conf import settings
import os
from rest_framework.permissions import IsAuthenticated
import re

BASE_DIR = getattr(settings, "BASE_DIR", None)
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, 'backend', '.env'))

keycloak_admin = ExtendedKeyCloakAdmin(server_url=env('BASE_URI'),
                               username=env('KEYCLOAK_ADMIN_USER'),
                               password=env('KEYCLOAK_ADMIN_PASSWORD'),
                               realm_name=env('KEYCLOAK_APP_REALM'),
                               user_realm_name='master',
                               verify=True)

auth = MyOIDCAB()

regex_stamm = re.compile('^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$')


# Create your views here.
class RegisterViewSet(viewsets.ViewSet):

    def search_group_tree_for_name(self, tree, name):
        for group in tree:
            if group["name"] == name:
                return group
            if group["subGroups"]:
                res = self.search_group_tree_for_name(group["subGroups"], name)
                if res:
                    return res

    def create(self, request, *args, **kwargs):
        serializers = RegisterSerializer(data=request.data)
        serializers.is_valid(raise_exception=True)

        # find group_id by group_name
        if regex_stamm.match(serializers.data.get('stamm')):
            group_id = serializers.data.get('stamm')
        else:
            all_groups = keycloak_admin.get_groups()
            group = self.search_group_tree_for_name(all_groups, serializers.data.get('stamm'))
            group_id = group["id"] if group else ''
            if not group_id:
                return Response({'status': 'failed', 'error': "group doesn't exist"},
                                status=status.HTTP_400_BAD_REQUEST)

        # data.get(key) returns a None object when the key in the dictionary does not exist
        # keycloak ignores key with empty values so no further check is required here
        try:
            new_user = keycloak_admin.create_user({"email": serializers.data.get('mail'),
                                                   "username": serializers.data.get('username'),
                                                   "firstName": serializers.data.get('firstname'),
                                                   "lastName": serializers.data.get('lastname'),
                                                   "enabled": True,
                                                   "credentials": [
                                                       {"value": serializers.data.get('password'), "type": "password", }
                                                   ],
                                                   "attributes": {
                                                       "birthdate": serializers.data.get('birthdate'),
                                                       "gender": serializers.data.get('gender'),
                                                       "city": serializers.data.get('city'),
                                                       "address": serializers.data.get('address'),
                                                       "zipcode": serializers.data.get('zipcode'),
                                                       "phone": serializers.data.get('phone'),
                                                       "additional_address": serializers.data.get('additional_address'),
                                                   }}, exist_ok=False)
            keycloak_admin.group_user_add(user_id=new_user, group_id=group_id)
        except KeycloakGetError as e:
            return Response({'status': 'failed', 'error': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Error within registration:\n{e}")
            return Response({'status': 'failed', 'error': 'internal server error'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'status': 'ok', 'user': new_user}, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):

        try:
            user = auth.get_userinfo(request.auth, None, None)
            print(user)
            return Response({'status': 'ok', 'user': user}, status=status.HTTP_200_OK)
        except KeycloakGetError:
            return Response({'status': 'failed', 'error': 'no user with user_id'},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Error getting user:\n{e}")
            return Response({'status': 'failed', 'error': 'internal server error'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class VerfiedUsersViewSet(viewsets.ViewSet):

    def ectract_info(self, users):
        response = []
        for user in users:
            response.append({
                "user_id": user.get("id"),
                "firstname": user.get("firstname", ""),
                "lastname": user.get("lastname", ""),
                "scout_name": user.get("username")
            })
        return response

    def remove_duplications(self, arr):
        return [dict(t) for t in {tuple(d.items()) for d in arr}]

    def list(self, request, *args, **kwargs):
        """
        List all unverified people that you are allowed to verify
        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        CAN_VERFIY_ALL_ROLE = "can_verfiy_all"
        CAN_VERFIY_ALL_UPPER_GROUP = "can_verfiy_upper_group"

        user_id = "289e812f-c231-4434-bd34-305d422b75e3" #Can verify all
        user_id = "edae4972-b154-441e-9c97-8c5afb154e99" #Can verify artus

        groups_of_user = keycloak_admin.get_user_groups(user_id)
        can_verfiy_all = False
        verifiable_group = []
        for user_group in groups_of_user:
            roles = keycloak_admin.get_group_realm_roles(user_group["id"])
            roles = [role["name"] for role in roles]

            if CAN_VERFIY_ALL_ROLE in roles:
                can_verfiy_all = True

            if CAN_VERFIY_ALL_UPPER_GROUP in roles:
                group_path = Path(user_group["path"])
                upper_group = keycloak_admin.get_group_by_path(str(group_path.parent), search_in_subgroups=True)
                verifiable_group.extend(keycloak_admin.get_all_subgroups(upper_group))
        verifiable_group = set(verifiable_group)

        if can_verfiy_all:
            try:
                verifiable_users = keycloak_admin.get_users_by_attribute({}, query_attr={"verified": False})
            except Exception as e:
                return Response({'status': 'failed', 'error': 'internal server error'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        elif verifiable_group:
            verifiable_users = []
            for verifiable_group in verifiable_group:
                try:
                    verifiable_users.extend(keycloak_admin.get_group_members_by_attribute(verifiable_group,
                                                                                        query_attr={"verified": False}))
                except Exception as e:
                    return Response({'status': 'failed', 'error': 'internal server error'},
                                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            verifiable_users = []

        verifiable_users = self.remove_duplications(self.ectract_info(verifiable_users))
        return Response({'status': 'ok', 'users': verifiable_users}, status=status.HTTP_200_OK)

class ScoutGroupsViewSet(viewsets.ViewSet):

    def list(self, request, *args, **kwargs):
        try:
            all_groups = keycloak_admin.get_groups()
        except KeycloakGetError as e:
            return Response({'status': 'failed', 'error': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Error when fetching staemme:\n{e}")
            return Response({'status': 'failed', 'error': 'internal server error'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        scout_groups = self.search_group_tree_for_scout_groups(all_groups)
        return Response({'status': 'ok', 'scout_groups': scout_groups}, status=status.HTTP_200_OK)

    def search_group_tree_for_scout_groups(self, tree):
        scout_groups = []
        for group in tree:
            if 'Ring' in group["name"]:
                staemme = []
                for stamm in group["subGroups"]:
                    if "Stamm" in stamm["name"]:
                        staemme.append({
                            'name': stamm["name"],
                            'id': stamm['id']
                        })

                scout_groups.append({
                    'name': group["name"],
                    'id': group['id'],
                    'staemme': staemme
                })
            elif group["subGroups"]:
                scout_groups += self.search_group_tree_for_scout_groups(group["subGroups"])
        return scout_groups


class ZipCodeSearchFilter(FilterSet):
    zip_city = CharFilter(field_name='zip_city', method='get_zip_city')

    class Meta:
        model = ZipCode
        fields = ['zip_code', 'city', 'id']

    def get_zip_city(self, queryset, field_name, value):
        cities = queryset.filter(Q(zip_code__contains=value) | Q(city__contains=value))
        if cities.count() > 250:
            raise PermissionDenied('Too many results!!!')
        return cities


class ZipCodeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ZipCode.objects.all()
    serializer_class = ZipCodeSerializer
    filterset_class = ZipCodeSearchFilter


class ScoutOrgaLevelViewSet(viewsets.ModelViewSet):
    queryset = ScoutOrgaLevel.objects.all()
    serializer_class = ScoutOrgaLevelSerializer


class EatHabitTypeViewSet(viewsets.ModelViewSet):
    queryset = EatHabitType.objects.all()
    serializer_class = EatHabitTypeSerializer
