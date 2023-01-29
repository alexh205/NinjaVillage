from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    review= db.Column(db.String, nullable=False)
    rating= db.Column(db.Integer, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    created_date = db.Column(db.DateTime(timezone=True), server_default=func.now())


    #! Relationships
    reviews_owned = db.relationship("User", back_populates="owned_reviews")
    reviews_product = db.relationship("Product", back_populates="product_reviews")
    review_images = db.relationship("Image", back_populates="images_review", cascade="all,delete")

    #? Methods
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'review': self.review,
            'rating': self.rating,
            'ownerId': self.owner_id,
            'productId': self.product_id,
            'created_date': self.created_date,
            'reviewImages': [image.to_dict() for image in self.review_images]
        }
