import pathlib

import environ
from keycloak import KeycloakAdmin

env = environ.Env()

BASE_DIR = pathlib.Path(__file__).parent.parent.resolve()
environ.Env.read_env(BASE_DIR / 'backend' / '.env')

keycloak_admin = KeycloakAdmin(server_url=env('BASE_URI'),
                               username=env('KEYCLOAK_ADMIN_USER'),
                               password=env('KEYCLOAK_ADMIN_PASSWORD'),
                               realm_name=env('KEYCLOAK_APP_REALM'),
                               user_realm_name='master',
                               verify=True)
