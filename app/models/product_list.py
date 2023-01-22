from .db import db, environment, SCHEMA, add_prefix_for_prod

ProductLists = db.Table(
    "product_lists",
    db.Model.metadata,
    db.Column('products', db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True, nullable=False),
    db.Column('wish_lists', db.Integer, db.ForeignKey(add_prefix_for_prod('wish_lists.id')), primary_key=True, nullable=False)
)

if environment == "production":
    ProductLists.schema = SCHEMA
