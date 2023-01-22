from app.models import db, User, environment, SCHEMA

def seed_users():
    users = [{"username": "Demo", "first_name": "John", "last_name": "Doe", "email": "demo@aa.io", "password": "password", "profile_img": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1017&q=80"},
    {"username": "marnie", "first_name": "Marnie", "last_name": "Stark", "email": "marnie@aa.io", "password": "password",
    "profile_img": "https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"},
    {"username": "bobbie", "first_name": "Bobbie", "last_name": "William", "email": "bobbie@aa.io", "password": "password", "profile_img": "https://images.unsplash.com/photo-1536164261511-3a17e671d380?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=982&q=80"}, {
        "username": "ghenry0",
        "first_name": "Giffard",
        "last_name": "Henry",
        "email": "ghenry0@blogspot.com",
        "password": "gB8G9T6oA",
        "profile_img": "https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2359&q=80"
    }, {
        "username": "cgrandham1",
        "first_name": "Cobb",
        "last_name": "Grandham",
        "email": "cgrandham1@joomla.org",
        "password": "w3gox3uDdj",
        "profile_img": "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
    }, {
        "username": "hcassley2",
        "first_name": "Humbert",
        "last_name": "Cassley",
        "email": "hcassley2@bbc.co.uk",
        "password": "0T0G4qct5",
        "profile_img": "https://images.unsplash.com/photo-1497206365907-f5e630693df0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
    }, {
        "username": "iallen3",
        "first_name": "Izzy",
        "last_name": "Allen",
        "email": "iallen3@time.gov",
        "password": "eziRJlJoe",
        "profile_img": "https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
    }, {
        "username": "jkadar4",
        "first_name": "Josh",
        "last_name": "Kadar",
        "email": "jkadar4@soup.io",
        "password": "et90uD",
        "profile_img": "https://images.unsplash.com/photo-1605895773434-3579e181bc3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
    }, {
        "username": "pcollelton5",
        "first_name": "Paul",
        "last_name": "Collelton",
        "email": "pcollelton5@flickr.com",
        "password": "eyRfcW6S",
        "profile_img": "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
    }, {
        "username": "tkolis6",
        "first_name": "Tim",
        "last_name": "Kolis",
        "email": "tkolis6@aa.com",
        "password": "WMV8TghcYdhI",
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
