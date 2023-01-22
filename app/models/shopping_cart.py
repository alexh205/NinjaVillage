from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .product_cart import ProductCarts


class ShoppingCart(db.Model):
    __tablename__ = 'shopping_carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    created_date = db.Column(db.DateTime(
        timezone=True), server_default=func.now())

    # ! Relationships
    carts_owned = db.relationship("User", back_populates="owned_carts")
    carts_product = db.relationship(
        "Product", secondary=ProductCarts, back_populates="product_carts")

    # ? Methods
    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'createdDate': self.created_date,
            'cartProducts': [product.to_dict_basic()['id'] for product in self.carts_product]
        }
