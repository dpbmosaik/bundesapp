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

BASE_DIR = getattr(settings, "BASE_DIR", None)
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, 'backend', '.env'))

keycloak_admin = KeycloakAdmin(server_url=env('BASE_URI'),
                               username=env('KEYCLOAK_ADMIN_USER'),
                               password=env('KEYCLOAK_ADMIN_PASSWORD'),
                               realm_name=env('OIDC_RP_REALMNAME'),
                               client_id=env('KEYCLOAK_ADMIN_CLIENT_ID'),
                               client_secret_key=env('KEYCLOAK_ADMIN_SECRET'),
                               verify=True)


# Create your views here.
class RegistrationViewSet(viewsets.ViewSet):

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
            return Response({'status': 'failed', 'error': e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
