from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, db, Product


product_routes = Blueprint('products', __name__)
auth_error = "You are not authorized to complete this action"

#* Get Product*****************************************************
@product_routes.route('/<int:id>')
@login_required
def product(id):
    """
    Query for a product by id and returns that product in a dictionary
    """
    product = Product.query.get_or_404(id)
    return product.to_dict()


#* Delete Product *****************************************************
@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def product_delete(id):
    """
    Query for a product by id and delete product from database
    """
    queried_product = Product.query.get_or_404(id)
    queried_user = User.query.get_or_404(queried_product.owner_id)



    if queried_user.id != current_user.id:
        return auth_error
    else:
        db.session.delete(queried_product)
        db.session.commit()
        return {'message': 'Successfully deleted'}


#* Create Product *****************************************************
@product_routes.route('/new', methods=['POST'])
@login_required
def product_create(id):
    """
    Create a new product instance and add to database
    """
    queried_product = Product.query.get_or_404(id)
    queried_user = User.query.get_or_404(queried_product.owner_id)



    if queried_user.id != current_user.id:
        return auth_error
    else:
        db.session.delete(queried_product)
        db.session.commit()
        return {'message': 'Successfully deleted'}
