from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    street_address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(10), nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    profile_img = db.Column(db.String(400))
    created_date = db.Column(db.DateTime(timezone=True), server_default=func.now())

    #! Relationships
    owned_carts = db.relationship("ShoppingCart", back_populates="carts_owned",cascade="all,delete")
    owned_lists = db.relationship("WishList", back_populates="lists_owned", cascade="all,delete")
    owned_products = db.relationship("Product", back_populates="products_owned", cascade="all,delete")
    owned_reviews = db.relationship("Review", back_populates="reviews_owned", cascade="all,delete")
    owned_images = db.relationship("Image", back_populates="images_owned", cascade="all,delete")

    # ? Methods
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'email': self.email,
            'profileImage': self.profile_img,
            'street_address':self.street_address,
            'city':self.city,
            'state':self.state,
            'zip_code':self.zip_code,
            'ownedCarts': [cart.to_dict() for cart in self.owned_carts],
            'ownedLists': [list.to_dict() for list in self.owned_lists],
            'ownedProducts': [product.to_dict() for product in self.owned_products],
            'userReviews': [review.to_dict() for review in self.owned_reviews],
            # 'userImages': [image.to_dict() for image in self.owned_images]
        }

    def to_dict_basic(self):
        return {
            'id': self.id,
            'name': self.name,
            'profileImage': self.profile_img,
        }
