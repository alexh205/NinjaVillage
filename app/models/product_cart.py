from .db import db, environment, SCHEMA, add_prefix_for_prod
ProductCarts = db.Table(
    "product_carts",
    db.Model.metadata,
    db.Column('products', db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')), primary_key=True, nullable=False),
    db.Column('shopping_carts', db.Integer, db.ForeignKey(
        add_prefix_for_prod('shopping_carts.id')), primary_key=True, nullable=False)
)

if environment == "production":
    ProductCarts.schema = SCHEMA
