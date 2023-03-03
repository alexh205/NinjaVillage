from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .product_cart import ProductCarts


class ShoppingCart(db.Model):
    __tablename__ = 'shopping_carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    total = db.Column(db.Integer, default=0)
    checked_out = db.Column(db.Boolean, nullable=False)
    estimated_delivery = db.Column(db.String, default=None)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    order_placed = db.Column(db.String, default=None)
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
            'total': self.total,
            'checkedOut': self.checked_out,
            'ownerId': self.owner_id,
            'createdDate': self.created_date,
            'orderPlaced': self.order_placed,
            'estimatedDate': self.estimated_delivery,
            'cartProducts': [product.to_dict() for product in self.carts_product],
            'total': self.total
        }
