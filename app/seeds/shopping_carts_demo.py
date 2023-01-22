from app.models import db, ShoppingCart, environment, SCHEMA


def seed_shopping_carts():
    carts = [{"owner_id": 1}, {"owner_id": 2}, {
        "owner_id": 3}, {"owner_id": 4}]

    db.session.add_all([ShoppingCart(**cart)for cart in carts])
    db.session.commit()


def undo_shopping_carts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.shopping_carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
