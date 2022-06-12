import json
from keycloak_login_admin import BASE_DIR, keycloak_admin

from treelib import Node, Tree

admin_groups = [{'name': '0_Führer_in'},
                {'name': '1_Stv. Führer_in'},
                {'name': '2_Schatzmeister_in'}]

data_source = BASE_DIR / 'data' / '1_scoutHierarchy.json'
with open(data_source, encoding="utf-8") as json_file:
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

    for admin_group in admin_groups:
        keycloak_admin.create_group(payload=admin_group, parent=parent_id, skip_exists=True)

    if not tree.children(node.identifier):
        return

    for child in tree.children(node.identifier):
        recursively_add_groups(tree, parent_id, child)


node = tree.get_node(tree.root)
groups = recursively_add_groups(tree=tree, parent_id=None, node=node)
