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

BASE_DIR = getattr(settings, "BASE_DIR", None)
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, 'backend', '.env'))

keycloak_admin = KeycloakAdmin(server_url=env('BASE_URI'),
                               username=env('KEYCLOAK_ADMIN_USER'),
                               password=env('KEYCLOAK_ADMIN_PASSWORD'),
                               realm_name=env('KEYCLOAK_APP_REALM'),
                               user_realm_name='master',
                               verify=True)

auth = MyOIDCAB()


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
        all_groups = keycloak_admin.get_groups()
        group = self.search_group_tree_for_name(all_groups, serializers.data.get('stamm'))
        group_id = group["id"] if group else ''
        if not group_id:
            return Response({'status': 'failed', 'error': "group doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

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
                                                       "stamm": serializers.data.get('stamm'),
                                                       "group": serializers.data.get('group'),
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
        return Response({'status': 'ok', 'scout_groups': sorted(scout_groups)}, status=status.HTTP_200_OK)

    def search_group_tree_for_scout_groups(self, tree):
        scout_groups = []
        for group in tree:
            if "Stamm" in group["name"]:
                scout_groups.append(group["name"])
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
