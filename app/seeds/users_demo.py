from app.models import db, User, environment, SCHEMA


def seed_users():
    users = [{"username": "Demo", "name": "John Doe", "email": "demo@aa.io", "password": "password", "street_address": "47 Del Mar Avenue",
              "city": "Honolulu",
              "state": "HI",
              "zip_code": "96825", "profile_img": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1017&q=80"},
             {"username": "marnie", "name": "Marnie Stark", "email": "marnie@aa.io", "password": "password", "street_address": "65 Summit Trail",
              "city": "Macon",
              "state": "GA",
              "zip_code": "31205",
              "profile_img": "https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"},
             {"username": "bobbie", "name": "Bobbie William", "email": "bobbie@aa.io", "password": "password", "street_address": "93957 Washington Way",
              "city": "Lakewood",
              "state": "WA",
              "zip_code": "98498", "profile_img": "https://images.unsplash.com/photo-1536164261511-3a17e671d380?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=982&q=80"}, {
        "username": "ghenry0",
        "name": "Gina Henry",
        "email": "ghenry0@blogspot.com",
        "password": "gB8G9T6oA", "street_address": "29094 Broad Street",
        "city": "Sacramento",
        "state": "CA",
        "zip_code": "95823",
        "profile_img": "https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2359&q=80"
    }, {
        "username": "cgrandham1",
        "name": "Cobb Grandham",
        "email": "cgrandham1@joomla.org",
        "password": "w3gox3uDdj", "street_address": "594 Di Loreto Alley",
        "city": "Amarillo",
        "state": "TX",
        "zip_code": "79116",
        "profile_img": "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
    }, {
        "username": "hcassley2",
        "name": "Humbert Cassley",
        "email": "hcassley2@bbc.co.uk",
        "password": "0T0G4qct5", "street_address": "98416 Del Mar Alley",
        "city": "Las Vegas",
        "state": "NV",
        "zip_code": "89150",
        "profile_img": "https://images.unsplash.com/photo-1497206365907-f5e630693df0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
    }, {
        "username": "iallen3",
        "name": "Izzy Allen",
        "email": "iallen3@time.gov",
        "password": "eziRJlJoe", "street_address": "36 Front Avenue",
        "city": "Richmond",
        "state": "VA",
        "zip_code": "23289",
        "profile_img": "https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
    }, {
        "username": "jkadar4",
        "name": "Josh Kadar",
        "email": "jkadar4@soup.io",
        "password": "et90uD", "street_address": "2 Heath Place",
        "city": "Reno",
        "state": "NV",
        "zip_code": "89505",
        "profile_img": "https://images.unsplash.com/photo-1605895773434-3579e181bc3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
    }, {
        "username": "pcollelton5",
        "name": "Paul Collelton",
        "email": "pcollelton5@flickr.com",
        "password": "eyRfcW6S", "street_address": "01 Continental Way",
        "city": "Jackson",
        "state": "MS",
        "zip_code": "39204",
        "profile_img": "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
    }, {
        "username": "tkolis6",
        "name": "Tim Kolis",
        "email": "tkolis6@aa.com",
        "password": "WMV8TghcYdhI", "street_address": "23747 Carey Junction",
        "city": "Portland",
        "state": "OR",
        "zip_code": "97271",
        "profile_img": "https://images.unsplash.com/photo-1669954879851-26df381d6dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1348&q=80"
    }]

    db.session.add_all([User(**user)for user in users])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
