import os

import environ
from django.conf import settings
from django.core.exceptions import PermissionDenied
from django.db.models import Q
from django_filters import FilterSet, CharFilter
from keycloak import KeycloakAdmin, KeycloakGetError
from rest_framework import status, viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .api_models import GroupTreeNode, Group
from .models import ScoutHierarchy, ZipCode, ScoutOrgaLevel, EatHabitType
from .serializers import RegisterSerializer, ScoutHierarchySerializer, ZipCodeSerializer, ScoutOrgaLevelSerializer, \
    EatHabitTypeSerializer

BASE_DIR = getattr(settings, "BASE_DIR", None)
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, 'backend', '.env'))

keycloak_admin = KeycloakAdmin(server_url=env('BASE_URI'),
                               username=env('KEYCLOAK_ADMIN_USER'),
                               password=env('KEYCLOAK_ADMIN_PASSWORD'),
                               realm_name=env('KEYCLOAK_APP_REALM'),
                               user_realm_name='master',
                               verify=True)


# Create your views here.
class UserViewSet(viewsets.ViewSet):
    def get(self, request, *args, **kwargs):
        user_id = request.GET['user_id']
        if user_id:
            try:
                user = keycloak_admin.get_user(user_id)
                return Response({'status': 'ok', 'user': user}, status=status.HTTP_200_OK)
            except KeycloakGetError:
                return Response({'status': 'failed', 'error': 'no user with user_id'},
                                status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print(f"Error when getting user with id {user_id}:\n{e}")
                return Response({'status': 'failed', 'error': 'internal server error'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'status': 'failed', 'error': 'no user_id parameter'}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        serializers = RegisterSerializer(data=request.data)
        serializers.is_valid(raise_exception=True)

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
                                                       "additional_adress": serializers.data.get('additional_adress'),
                                                       "stamm": serializers.data.get('stamm'),
                                                       "group": serializers.data.get('group'),
                                                   }}, exist_ok=False)
            return Response({'status': 'ok', 'user': new_user}, status=status.HTTP_200_OK)
        except KeycloakGetError:
            return Response({'status': 'failed', 'error': 'user already exists'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Error within registration:\n{e}")
            return Response({'status': 'failed', 'error': 'internal server error'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GroupViewSet(viewsets.ViewSet):
    def get(self, request, *args, **kwargs):
        groups = keycloak_admin.get_groups()

        def create_tree_node(kc_group, node: GroupTreeNode):
            node.group = Group(id=kc_group['id'], name=kc_group['name'], type='Stamm',
                               permissions='write')
            for kc_child_group in kc_group['subGroups']:
                child_node = GroupTreeNode()
                child_node.sub_groups = []
                create_tree_node(kc_group=kc_child_group, node=child_node)
                node.sub_groups.append(child_node)

        for kc_group in groups:
            root_node = GroupTreeNode()
            root_node.sub_groups = []
            create_tree_node(kc_group, root_node)

        return Response(data=root_node.json().encode('utf-8'), status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        pass


class ScoutHierarchyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ScoutHierarchy.objects.all().exclude(level=6)
    serializer_class = ScoutHierarchySerializer


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
