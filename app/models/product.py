from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .product_cart import ProductCarts
from .product_list import ProductLists

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    brand = db.Column(db.String(70), nullable=False)
    image = db.Column(db.String(500), nullable=False)
    count = db.Column(db.Integer)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_date = db.Column(db.DateTime(timezone=True), server_default=func.now())


    # ! Relationships
    products_owned = db.relationship("User", back_populates="owned_products")
    product_reviews = db.relationship("Review", back_populates="reviews_product",cascade="all,delete")
    product_carts = db.relationship("ShoppingCart", secondary=ProductCarts, back_populates="carts_product")
    product_lists = db.relationship("WishList", secondary=ProductLists, back_populates="lists_product")
    product_images = db.relationship("Image", back_populates="images_product", cascade="all,delete")

    # ? Methods
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'description': self.description,
            'category': self.category,
            'brand': self.brand,
            'image': self.image,
            'count': self.count,
            'ownerId': self.owner_id,
            'productImages': [image.to_dict() for image in self.product_images],
            'productReviews': [review.to_dict() for review in self.product_reviews]
        }

    def to_dict_basic(self):
        return {
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'description': self.description,
            'category': self.category,
            'brand': self.brand,
            'image': self.image,
            # 'ownerId': self.owner_id,
        }
