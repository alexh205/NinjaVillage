from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description= db.Column(db.String, nullable=False)
    category= db.Column(db.String, nullable=False)
    brand= db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    count = db.Column(db.Integer, nullable=False)


    created_date = db.Column(db.DateTime(timezone=True), server_default=func.now())

    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)


#! Relationships

#? methods
