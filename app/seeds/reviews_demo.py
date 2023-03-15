from app.models import db, Review, environment, SCHEMA


def seed_reviews():
    reviews = [{"title": "Great Bag!", "review": "This bag has allowed me to carry all my essentials with me (Treats, toys, sunglasses and my go-to hair dryer).", "rating": 4, "owner_id": 2, "product_id": 1}, {"title": "Comfortable Shirt", "review": "I would buy this shirt again!", "rating": 5, "owner_id": 4, "product_id": 2}, {"title": "Disappointed!", "review": "worst jacket ever!", "rating": 1, "owner_id": 3, "product_id": 3}, {"title": "Average Shirt", "review": "It's a shirt and it just works.", "rating": 3, "owner_id": 4, "product_id": 4}, {
        "title": "Average bag!", "review": "It could be a little bigger", "rating": 2, "owner_id": 5, "product_id": 1}, {"title": "Durability questionable", "review": "About six months of use and I noticed the fabric dividing two of the pockets has torn at the top so the two pockets are open to each other now. Still functional but it does make me worry about the durability of the rest of the backpack since it is only under pretty light use.", "rating": 3, "owner_id": 5, "product_id": 1}, {"title": " Pretty amazing product, dimensions are not exact", "review": "This thing is warm, thick, and well built. The sleeves for a large look barely at 34.5 inches though, and there is no way a size 40 waist will fit in this either. So if you have longer arms or bigger than 38 inch waist, size up. If fits me at 6’, 38 inch waist with 35 inch arms, so it barely fits without being too snug.", "rating": 4, "owner_id": 1, "product_id": 3}]

    db.session.add_all([Review(**review)for review in reviews])
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
