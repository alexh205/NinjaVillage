from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(1000))
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')))
    review_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('reviews.id')))
    created_date = db.Column(db.DateTime(
        timezone=True), server_default=func.now())

    #! Relationships
    images_owned = db.relationship("User", back_populates="owned_images")
    images_product = db.relationship(
        "Product", back_populates="product_images")
    images_review = db.relationship("Review", back_populates="review_images")

    # ? methods
    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'ownerId': self.owner_id,
            'productId': self.product_id,
            'reviewId': self.review_id,
        }
