# create venv
`virtualenv venv`

# activate venv
`source venv/bin/activate`

Mac, Linux: ( `pipenv install` )
             `pipenv shell`

# place the env file
Place the `.env` file next to the settings.py

# install
`pip install -r requirements.txt`

`python manage.py makemigrations`

`python manage.py migrate`

Mac, Linux:

`python manage.py loaddata data/data/*.json`

Windows: 

`python manage.py add_fixtures data`

Start Server:

`python manage.py runserver`

# deactivate venv
`deactivate`

# PostGres for MacOS
`brew install postgresql`

Get Zipcodes:
    
    GET http://127.0.0.1:8000/auth/zip-code/

    Answer:
    [
        {
            "id": 1,
            "createdAt": null,
            "updatedAt": null,
            "zipCode": "78267",
            "city": "Aach",
            "lat": "47.844888348845100",
            "lon": "8.863226244902150"
        },
        {
            "id": 2,
            "createdAt": null,
            "updatedAt": null,
            "zipCode": "54298",
            "city": "Aach",
            "lat": "49.842376095144800",
            "lon": "6.586687851934220"
        },
        ....
    ]

Filter Zipcodes:

    GET http://127.0.0.1:8000/auth/zip-code/?zip_city=aa
    [
        {
            "id": 1,
            "createdAt": null,
            "updatedAt": null,
            "zipCode": "78267",
            "city": "Aach",
            "lat": "47.844888348845100",
            "lon": "8.863226244902150"
        },
        {
            "id": 2,
            "createdAt": null,
            "updatedAt": null,
            "zipCode": "54298",
            "city": "Aach",
            "lat": "49.842376095144800",
            "lon": "6.586687851934220"
        },
        ...
    ]

Get Stämme, Ringe und Bund as Tree
    
    GET http://127.0.0.1:8000/auth/scout-hierarchy/
    
    Answer:
    [
        {
            "id": 2,
            "createdAt": null,
            "updatedAt": null,
            "name": "DBP-Mosaik",
            "level": 3,
            "zipCode": null,
            "parent": null
        },
        {
            "id": 20,
            "createdAt": null,
            "updatedAt": null,
            "name": "Ring Rhein Lippe",
            "level": 4,
            "zipCode": null,
            "parent": 2
        },
        {
            "id": 347,
            "createdAt": null,
            "updatedAt": null,
            "name": "Stamm Eulen",
            "level": 5,
            "zipCode": 11032,
            "parent": 25
        },
        ...
    ]

Get Eathabits

    GET http://127.0.0.1:8000/auth/eat-habit-type/
    Answer:
    [
        {
            "id": 1,
            "createdAt": null,
            "updatedAt": null,
            "name": "Kein Fleisch (Vegetarisch)",
            "description": "",
            "isCustom": false
        },
        {
            "id": 2,
            "createdAt": null,
            "updatedAt": null,
            "name": "Keine Tierprodukte (Vegan)",
            "description": "",
            "isCustom": false
        },
        ...
    ]

Retrieve Scout levels

    GET http://127.0.0.1:8000/auth/scout-orga-level/
    Answer:
    [
        {
            "id": 1,
            "createdAt": null,
            "updatedAt": null,
            "name": "Pfadfinder_innen",
            "description": ""
        },
        {
            "id": 2,
            "createdAt": null,
            "updatedAt": null,
            "name": "Verband",
            "description": ""
        },
        ...
    ]
