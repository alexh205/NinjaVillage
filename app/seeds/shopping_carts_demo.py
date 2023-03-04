from app.models import db, ShoppingCart, environment, SCHEMA


def seed_shopping_carts():
    carts = [{"checked_out": False, "owner_id": 1},
             {"checked_out": False, "owner_id": 2},
             {"checked_out": False, "owner_id": 3},
             {"checked_out": False, "owner_id": 4}, {"checked_out": False, "owner_id": 5}, {"checked_out": False, "owner_id": 6}]

    db.session.add_all([ShoppingCart(**cart)for cart in carts])
    db.session.commit()


def undo_shopping_carts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.shopping_carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM shopping_carts")

    db.session.commit()
