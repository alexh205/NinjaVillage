from app.models import db, WishList, environment, SCHEMA


def seed_wish_lists():
    wish_lists = [{"name": "Wish List", "owner_id": 1}, {"name": "Favorites", "owner_id": 1}, {
        "name": "Wish List", "owner_id": 2}, {"name": "Wish List", "owner_id": 3}, {"name": "Wish List", "owner_id": 4}, {
        "name": "Wish List", "owner_id": 5}, {"name": "Wish List", "owner_id": 6}, {"name": "Gaming", "owner_id": 6}]

    db.session.add_all([WishList(**wish_list)for wish_list in wish_lists])
    db.session.commit()


def undo_wish_lists():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.wish_lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM wish_lists")

    db.session.commit()
