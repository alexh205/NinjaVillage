from app.models import db, WishList, environment, SCHEMA

def seed_wish_lists():
    wish_lists = [{"name": "Favorites", "owner_id": 1}, {
        "name": "wishList", "owner_id": 2}, {"name": "Christmas List", "owner_id": 1}]

    db.session.add_all([WishList(**wish_list)for wish_list in wish_lists])
    db.session.commit()


def undo_wish_lists():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.wish_lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM wish_lists")

    db.session.commit()
