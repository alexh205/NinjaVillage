from app.models import db, Image, environment, SCHEMA

def seed_images():
    images = [{"url": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "owner_id": 2, "product_id":None, "review_id":1},
    {"url": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "owner_id": 4 , "product_id":None, "review_id":2},
    {"url": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", "owner_id": 3, "product_id":None, "review_id":3},
    {"url": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg", "owner_id": 4, "product_id":None, "review_id": 4}]

    db.session.add_all([Image(**image)for image in images])
    db.session.commit()


def undo_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")

    db.session.commit()
