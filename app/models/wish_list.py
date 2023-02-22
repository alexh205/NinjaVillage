from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .product_list import ProductLists

class WishList(db.Model):
    __tablename__ = 'wish_lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_date = db.Column(db.DateTime(timezone=True), server_default=func.now())

    # ! Relationships
    lists_owned = db.relationship("User", back_populates="owned_lists")
    lists_product = db.relationship("Product", secondary=ProductLists, back_populates="product_lists")

    # ? Methods
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.owner_id,
            'createdDate': self.created_date,
            'listProducts': [list.to_dict() for list in self.lists_product]
        }
