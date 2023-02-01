from app.models import db, Review, environment, SCHEMA


def seed_reviews():
    reviews = [{"title": "Great Bag!", "review": "This bag has allowed me to carry all my essentials with me (Treats, toys, sunglasses and my go-to hair dryer)","rating": 4, "owner_id": 2, "product_id": 1},{"title": "Comfortable Shirt", "review": "I would buy this shirt again!","rating": 5, "owner_id": 7, "product_id": 2},{"title": "Disappointed!", "review": "worst jacket ever!","rating": 1, "owner_id": 3, "product_id": 3},{"title": "Average Shirt", "review": "It's a shirt and it just works","rating": 3, "owner_id": 4, "product_id": 4}, {"title": "Average bag!", "review": "It could be a little bigger","rating": 2, "owner_id": 5, "product_id": 1}]

    db.session.add_all([Review(**review)for review in reviews])
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
