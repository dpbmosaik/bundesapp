import unittest

import environ
from django.conf import settings
import os

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from authentication.ExtendedKeycloakAdmin import ExtendedKeyCloakAdmin

BASE_DIR = getattr(settings, "BASE_DIR", None)
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, 'backend', '.env.test'))

keycloak_admin = ExtendedKeyCloakAdmin(server_url=env('BASE_URI'),
                                       username=env('KEYCLOAK_ADMIN_USER'),
                                       password=env('KEYCLOAK_ADMIN_PASSWORD'),
                                       realm_name=env('KEYCLOAK_APP_REALM'),
                                       user_realm_name='master',
                                       verify=True)

class ViewTests(APITestCase):
    user_ids = []

    def setUp(self):
        self.can_all_user = keycloak_admin.create_user({"email": "can_all",
                                           "username": "can_all",
                                           "enabled": True,
                                           "attributes": {
                                               "verified": "True"
                                           }}, exist_ok=True)
        self.user_ids.append(self.can_all_user)
        self.user_ids.append(keycloak_admin.create_user({"email": "ver1",
                                    "username": "ver1",
                                    "enabled": True,
                                    "attributes": {
                                        "verified": "False"
                                    }}, exist_ok=True))
        self.user_ids.append(keycloak_admin.create_user({"email": "ver2",
                                    "username": "ver2",
                                    "enabled": True,
                                    "attributes": {
                                        "verified": "False"
                                    }}, exist_ok=True))
        self.user_ids.append(keycloak_admin.create_user({"email": "ver3",
                                    "username": "ver3",
                                    "enabled": True,
                                    "attributes": {
                                        "verified": "False"
                                    }}, exist_ok=True))
        self.can_sub_user = keycloak_admin.create_user({"email": "nver1",
                                    "username": "nver1",
                                    "enabled": True,
                                    "attributes": {
                                        "verified": "True"
                                    }}, exist_ok=True)
        self.user_ids.append(self.can_sub_user)
        group = keycloak_admin.get_group_by_path(path='/DPBM/0_Führer_in', search_in_subgroups=True)
        keycloak_admin.group_user_add(self.can_all_user, group["id"])
        role = keycloak_admin.get_realm_role("CanVerifyAll")
        keycloak_admin.assign_group_realm_roles(group["id"], role)

        group = keycloak_admin.get_group_by_path(path='/DPBM/Ring Bayern/Stamm König Artus/0_Führer_in', search_in_subgroups=True)
        keycloak_admin.group_user_add(self.can_sub_user, group["id"])
        role = keycloak_admin.get_realm_role("CanVerifyBelow")
        keycloak_admin.assign_group_realm_roles(group["id"], role)


        group = keycloak_admin.get_group_by_path(path='/DPBM/Ring Bayern/Stamm König Artus', search_in_subgroups=True)
        keycloak_admin.group_user_add(self.user_ids[1], group["id"])
        keycloak_admin.group_user_add(self.user_ids[2], group["id"])
        keycloak_admin.group_user_add(self.can_sub_user, group["id"])
        group = keycloak_admin.get_group_by_path(path='/DPBM/Ring Bayern/Stamm Raubvögel', search_in_subgroups=True)
        keycloak_admin.group_user_add(self.user_ids[3], group["id"])

        User.objects.create_user(self.can_all_user, self.can_all_user, "")
        User.objects.create_user(self.can_sub_user, self.can_sub_user, "")
        User.objects.create_user(self.user_ids[1], self.user_ids[1], "")


    def test_verfiy_show(self):
        #Test show all
        self.client.force_authenticate(user=self.can_all_user)
        response = self.client.get("/auth/users/pending/")

        self.assertEquals(status.HTTP_200_OK, response.status_code)
        self.assertEquals(len(response.data["users"]), 3)
        names = [user["scout_name"] for user in response.data["users"]]
        self.assertTrue("nver1" not in names)

        # Test show subgroup
        self.client.force_authenticate(user=self.can_sub_user)
        response = self.client.get("/auth/users/pending/")

        self.assertEquals(status.HTTP_200_OK, response.status_code)
        self.assertEquals(len(response.data["users"]), 2)
        names = [user["scout_name"] for user in response.data["users"]]
        self.assertTrue("ver3" not in names)
        self.assertTrue("nver1" not in names)

        # Test show none
        self.client.force_authenticate(user=self.user_ids[1])
        response = self.client.get("/auth/users/pending/")

        self.assertEquals(status.HTTP_200_OK, response.status_code)
        self.assertEquals(len(response.data["users"]), 0)


    def tearDown(self):
        for id in self.user_ids:
            keycloak_admin.delete_user(user_id=id)
        group = keycloak_admin.get_group_by_path(path='/DPBM/0_Führer_in', search_in_subgroups=True)
        role = keycloak_admin.get_realm_role("CanChangeAll")
        keycloak_admin.delete_group_realm_roles(group["id"], role)

        group = keycloak_admin.get_group_by_path(path='/DPBM/Ring Bayern/Stamm König Artus/0_Führer_in', search_in_subgroups=True)
        role = keycloak_admin.get_realm_role("CanVerifyBelow")
        keycloak_admin.delete_group_realm_roles(group["id"], role)
