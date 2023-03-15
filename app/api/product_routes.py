from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, db, Product


product_routes = Blueprint('products', __name__)
auth_error = "User not authorized to complete this action"

# * Get Product*****************************************************


@product_routes.route('/<int:id>')
def product(id):
    """
    Query for a product by id and returns that product in a dictionary
    """
    product = Product.query.get_or_404(id)
    return product.to_dict()

# * Get all Products *****************************************************


@product_routes.route('/all', methods=['GET'])
def all_product():
    """
    Query for a product by id and returns that product in a dictionary
    """
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}


# * Delete Product *****************************************************
@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def product_delete(id):
    """
    Delete a product after checking for user ownership
    """
    queried_product = Product.query.get_or_404(id)
    queried_user = User.query.get_or_404(queried_product.owner_id)

    if queried_user.id != current_user.id:
        return auth_error
    else:
        db.session.delete(queried_product)
        db.session.commit()
        return {'message': 'Successfully deleted'}


# * Create Product *****************************************************
@product_routes.route('/new', methods=['POST'])
@login_required
def product_create():
    """
    Create a new product instance and add to database
    """
    req_data = request.json

    new_product = Product(
        title=req_data['title'],
        price=req_data['price'],
        description=req_data['description'],
        category=req_data['category'],
        brand=req_data['brand'],
        owner_id=current_user.id
    )

    db.session.add(new_product)
    db.session.commit()

    return new_product.to_dict()


# * Edit Product *****************************************************
@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def product_edit(id):
    """
    Update an existing product instance after checking for user ownership, and then add changes to database
    """
    queried_product = Product.query.get_or_404(id)
    queried_user = User.query.get_or_404(queried_product.owner_id)

    if queried_user.id != current_user.id:
        return auth_error
    else:
        req_data = request.json
        for key, val in req_data.items():
            if key != None:
                setattr(queried_product, key, val)
        db.session.commit()
        return queried_product.to_dict()
