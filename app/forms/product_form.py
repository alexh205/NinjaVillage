from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,DecimalField, SelectField, TextAreaField
from wtforms.validators import DataRequired

class ProductForm(FlaskForm):
    title= StringField('Title', validators=[DataRequired()])
    price= IntegerField('Price', validators=[DataRequired()])
    description= TextAreaField('Description', validators=[DataRequired()])
    category= SelectField('Category', validators=[DataRequired()], choices=['Books', 'Clothing, Shoes & Jewelry', 'Groceries','Health & Household', 'Video Games', 'Beauty & Personal Care', 'Pet Supplies', 'Electronics'])
    brand= StringField('Brand', validators=[DataRequired()])
    image= StringField('Image', validators=[DataRequired()])
    count= IntegerField('Count', validators=[DataRequired()])
