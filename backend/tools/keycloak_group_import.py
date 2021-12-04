import json
import pathlib

import environ
from keycloak import KeycloakAdmin
from treelib import Node, Tree

env = environ.Env()

BASE_DIR = pathlib.Path(__file__).parent.parent.resolve()
environ.Env.read_env(BASE_DIR / 'backend' / '.env')

keycloak_admin = KeycloakAdmin(server_url=env('BASE_URI'),
                               username=env('KEYCLOAK_ADMIN_USER'),
                               password=env('KEYCLOAK_ADMIN_PASSWORD'),
                               realm_name=env('KEYCLOAK_APP_REALM'),
                               user_realm_name='master',
                               verify=True)

data_source = BASE_DIR / 'data' / '1_scoutHierarchy.json'
with open(data_source) as json_file:
    data = json.load(json_file)

tree = Tree()
for element in data:
    pk_id = element['pk']
    name = element['fields']['name']
    parent = element['fields']['parent']
    tree.create_node(tag=name, identifier=pk_id, parent=parent)


def get_path(tree: Tree, path: str, node: Node) -> str:
    parent = tree.get_node(tree.ancestor(node.identifier))
    if parent is not None:
        path = get_path(tree, path, parent)

    path += '/' + node.tag
    return path


def recursively_add_groups(tree: Tree, parent_id: str, node: Node) -> dict:
    group = {'name': node.tag}
    keycloak_admin.create_group(payload=group, parent=parent_id, skip_exists=True)
    path = get_path(tree, '', node)
    parent_id = keycloak_admin.get_group_by_path(path, search_in_subgroups=True)['id']
    if not tree.children(node.identifier):
        return

    for child in tree.children(node.identifier):
        recursively_add_groups(tree, parent_id, child)


node = tree.get_node(tree.root)
groups = recursively_add_groups(tree=tree, parent_id=None, node=node)
