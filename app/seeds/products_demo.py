from app.models import db, Product, environment, SCHEMA


def seed_products():
    products = [{}]



    db.session.add_all([Product(**product)for product in products])
    db.session.commit()



def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
