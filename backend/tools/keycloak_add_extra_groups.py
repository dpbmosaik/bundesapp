from keycloak_login_admin import keycloak_admin

groups = [{'name': 'UmS-Team',
           'childs': [],
           'roles': ''},
          {'name': 'haddak Redaktion',
           'childs': [
               {'name': 'Chefredaktion',
                'childs': []},
           ]},
          {'name': 'Pfadfinder-Bundesamt',
           'childs': [
               {'name': 'Vorsitz',
                'childs': []},
               {'name': 'Vorstand',
                'childs': []}
           ]},
          {'name': 'Geschäftsstelle',
           'childs': []},
          {'name': 'App-Verwaltung',
           'childs': []},
          {'name': 'Gast',
           'childs': []},
          ]


def create_custom_groups(iter_group, parent_id=None, path=''):
    for group in iter_group:
        payload = {'name': group['name']}
        created_group = keycloak_admin.create_group(payload=payload, parent=parent_id, skip_exists=True)
        if len(group['childs']) > 0:
            local_path = f'{path}/{group["name"]}'
            if created_group is not None \
                    and created_group is not b'' \
                    and 'Already exists' not in created_group \
                    and created_group['id'] is not None:
                local_parent_id = created_group['id']
            else:
                local_parent_id = keycloak_admin.get_group_by_path(local_path, search_in_subgroups=True)['id']
            create_custom_groups(group['childs'], local_parent_id, local_path)


create_custom_groups(groups)
