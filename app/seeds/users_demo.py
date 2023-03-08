from app.models import db, User, environment, SCHEMA


def seed_users():
    users = [{"username": "Demo", "name": "John Doe", "email": "demo@aa.io", "password": "password", "street_address": "47 Del Mar Avenue",
              "city": "Honolulu",
              "state": "HI",
              "zip_code": "96825", "profile_img": "https://images.unsplash.com/photo-1654900365111-34ae7a645c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=817&q=80"},
             {"username": "marnie", "name": "Marnie Stark", "email": "marnie@aa.io", "password": "password", "street_address": "65 Summit Trail",
              "city": "Macon",
              "state": "GA",
              "zip_code": "31205",
              "profile_img": "https://images.unsplash.com/photo-1552939037-6d7afda394c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fG5pbmphJTIwcG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"},
             {"username": "bobbie", "name": "Bobbie William", "email": "bobbie@aa.io", "password": "password", "street_address": "93957 Washington Way",
              "city": "Lakewood",
              "state": "WA",
              "zip_code": "98498", "profile_img": "https://images.unsplash.com/photo-1640685425708-9a1b4c1988ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fG5pbmphJTIwcG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"}, {
        "username": "ghenry0",
        "name": "Gina Henry",
        "email": "ghenry0@blogspot.com",
        "password": "gB8G9T6oA", "street_address": "29094 Broad Street",
        "city": "Sacramento",
        "state": "CA",
        "zip_code": "95823",
        "profile_img": "https://images.unsplash.com/photo-1572987744154-c41fa44b36a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fG5pbmphJTIwcG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    }, {
        "username": "cgrandham1",
        "name": "Cobb Grandham",
        "email": "cgrandham1@joomla.org",
        "password": "w3gox3uDdj", "street_address": "594 Di Loreto Alley",
        "city": "Amarillo",
        "state": "TX",
        "zip_code": "79116",
        "profile_img": "https://images.unsplash.com/photo-1597047521791-32e57285b0d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fG5pbmphJTIwcG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    }, {
        "username": "alexH",
        "name": "Alexios AC",
        "email": "alex@aa.com",
        "password": "password", "street_address": "23747 Kosmos Arena",
        "city": "Portland",
        "state": "OR",
        "zip_code": "00425",
        "profile_img": "https://images.unsplash.com/photo-1634120151525-800e685a7c75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjEzfHxuaW5qYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
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
