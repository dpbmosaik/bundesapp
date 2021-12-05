import json
import unittest

from django.test import Client
from django.test import TestCase

from authentication.api_models import GroupTreeNode
from backend import settings

urlconf = __import__(settings.ROOT_URLCONF, {}, {}, [''])


class RegisterViewTests(TestCase):
    def setUp(self) -> None:
        self._client = Client()

    def test_groups(self):
        response = self._client.get(path='/auth/groups/', data={})
        self.assertEqual(response.status_code, 200)

        def recursive_print_group(groupContainer, level: int):
            print(str().ljust(level, '\t') + str(groupContainer['group']))
            for group in groupContainer['sub_groups']:
                recursive_print_group(group, level=level + 1)

        recursive_print_group(json.loads(response.data), level=0)
        tree = GroupTreeNode(**json.loads(response.data))


if __name__ == '__main__':
    unittest.main()
