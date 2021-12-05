from keycloak_login_admin import keycloak_admin

roles = [
    {'name': 'CanChangeOwn',
     'description': 'Man kann damit Personen seiner eigenen in Gruppe einsortieren'},
    {'name': 'CanChangeBelow',
     'description': 'Man kann damit Personen hierarisch untergeordneten in Gruppe einsortieren'},
    {'name': 'CanChangeSameLevel',
     'description': 'Man kann damit Personen hierarisch auf dem selben Level in Gruppe einsortieren'},
    {'name': 'CanChangeAll',
     'description': 'Man kann damit alle Personen in alle Gruppe einsortieren'},
    {'name': 'CanVerifyAll',
     'description': 'Man kann damit alle Personen verifizieren'},
    {'name': 'CanVerifyBelow',
     'description': 'Man kann damit alle Personen, die hierarisch untergeordnet sind, verifizieren'},
]

for role in roles:
    created_role = keycloak_admin.create_realm_role(payload=role)
    print(created_role)
