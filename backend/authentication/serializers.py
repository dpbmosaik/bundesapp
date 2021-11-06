from rest_framework import serializers
from .models import ScoutHierarchy, ScoutOrgaLevel, ZipCode, EatHabitType


class RegisterSerializer(serializers.Serializer):
    firstname = serializers.CharField()
    lastname = serializers.CharField()
    scout_name = serializers.CharField(required=False)
    mail = serializers.CharField()
    birthdate = serializers.DateField()
    gender = serializers.CharField()
    adress_street = serializers.CharField(required=False)
    adress = serializers.CharField(required=False)
    zipcode_city = serializers.CharField(required=False)
    phone = serializers.CharField(required=False)
    additional_adress = serializers.CharField(required=False)
    stamm = serializers.CharField()
    group = serializers.CharField(required=False)
    username = serializers.CharField()
    password = serializers.CharField()


class ScoutHierarchySerializer(serializers.ModelSerializer):
    class Meta:
        model = ScoutHierarchy
        fields = '__all__'


class ZipCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ZipCode
        fields = '__all__'


class ScoutOrgaLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScoutOrgaLevel
        fields = '__all__'


class EatHabitTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EatHabitType
        fields = '__all__'
