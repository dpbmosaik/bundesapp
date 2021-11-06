from .serializers import RegisterSerializer, ScoutHierarchySerializer, ZipCodeSerializer, ScoutOrgaLevelSerializer, \
    EatHabitTypeSerializer
from django.db.models import Q
from django_filters import FilterSet, CharFilter
from rest_framework import status, viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from .models import ScoutHierarchy, ZipCode, ScoutOrgaLevel, EatHabitType


# Create your views here.
class RegistrationViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        serializers = RegisterSerializer(data=request.data)
        serializers.is_valid(raise_exception=True)
        return Response({'status': 'ok'}, status=status.HTTP_200_OK)


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
