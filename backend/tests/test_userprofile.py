import unittest

from django.test import Client
from django.test import TestCase

from tools.keycloak_login_admin import keycloak_admin


class RegisterViewTests(TestCase):
    def setUp(self) -> None:
        self._client = Client()
        self._dummy_user = {
            'mail': 'asdasdasdsd@dfdsfsadada.de',
            'username': 'obiistderbeste',
            'firstname': 'obi',
            'lastname': 'derBeste',
            'enabled': True,
            'password': 'obiistderbeste123',
            'birthdate': '1923-12-12',
            'gender': 'gehtdichnixan',
            'city': 'München',
            'address': 'Am Platzl 1',
            'zipcode': '80331',
            'phone': '0123456789',
            'additional_address': '',
            'stamm': 'Stamm Silberfüchse',
            'group': 'Meute Tischli :)'
        }

    def tearDown(self) -> None:
        user_id = keycloak_admin.get_user_id(username=self._dummy_user['username'])
        if user_id is not None:
            keycloak_admin.delete_user(user_id=user_id)

    def test_registration(self):
        response = self._client.post(path='/auth/user/', data=self._dummy_user)
        self.assertEqual(response.status_code, 200)

        user_id = keycloak_admin.get_user_id(username=self._dummy_user['username'])
        self.assertIsNotNone(user_id)

        response = self._client.get(path='/auth/user/', data={'user_id': user_id})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user']['id'], user_id)


if __name__ == '__main__':
    unittest.main()
