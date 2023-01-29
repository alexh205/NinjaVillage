from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, ShoppingCart, db, Product

shopping_cart_routes = Blueprint('shopping_carts', __name__)
auth_error= "User is not authorized to complete this action"

#* Get Shopping Cart *****************************************************
@shopping_cart_routes.route('/<int:id>')
@login_required
def shopping_cart(id):
    """
    Query for an shopping_cart by id and returns that review in a dictionary
    """
    shopping_cart = ShoppingCart.query.get_or_404(id)
    return shopping_cart.to_dict()


#* Delete an item from Shopping Cart *****************************************************
@shopping_cart_routes.route('/remove/<int:id>', methods=['PUT'])
@login_required
def shopping_cart_delete(id):
    """
    Delete a product from a shopping_cart after checking for user ownership
    """
    req_data= request.json
    queried_shopping_cart = ShoppingCart.query.get_or_404(id)
    queried_user = User.query.get_or_404(queried_shopping_cart.owner_id)
    queried_product = Product.query.get_or_404(req_data['productId'])

    if queried_user.id != current_user.id:
        return auth_error
    else:
        if len(queried_shopping_cart.carts_product) > 0 and queried_product != None and queried_product in queried_shopping_cart.carts_product:
            queried_shopping_cart.carts_product.remove(queried_product)
            db.session.commit()
            return queried_shopping_cart.to_dict()
        if len(queried_shopping_cart.carts_product) < 1 and queried_product != None:
            return {'message': 'Shopping Cart is currently empty!'}
        if len(queried_shopping_cart.carts_product) > 0 and queried_product != None and queried_product not in queried_shopping_cart.carts_product:
            return {'message': 'Can not delete a product that is not currently in the cart'}
        else:
            return {'message': 'This product does not exist!'}



#* Add Item to Shopping Cart *****************************************************
@shopping_cart_routes.route('/<int:id>', methods=['PUT'])
@login_required
def shopping_cart_edit(id):
    """
    Update an existing shopping_cart instance after checking for user ownership, and then add changes to database
    """
    queried_shopping_cart = ShoppingCart.query.get_or_404(id)
    queried_user = User.query.get_or_404(queried_shopping_cart.owner_id)

    req_data = request.json
    if queried_user.id != current_user.id:
        return auth_error
    else:
        if req_data['item']:
            new_product = Product.query.get_or_404(req_data['item']['id'])
            if new_product.count == 0:
                return {"message", 'Item is no longer available'}, 404
            else:
                queried_shopping_cart.carts_product.append(new_product)
                db.session.commit()

        return queried_shopping_cart.to_dict()

#* Create Shopping Cart *****************************************************
@shopping_cart_routes.route('/new', methods=['POST'])
@login_required
def shopping_cart_create():
    """
    Create a new shopping_cart instance, and then add to database
    """
    new_shopping_cart = ShoppingCart(
        checked_out= False,
        owner_id= current_user.id,
    )
    db.session.add(new_shopping_cart)
    db.session.commit()

    return new_shopping_cart.to_dict()

#* Update Shopping Cart *****************************************************
# @shopping_cart_routes.route('/update/<int:id>', methods=['PUT'])
# @login_required
# def shopping_cart_update(id):
#     """
#     Update an existing shopping_cart instance after checking for user ownership, and then add changes to database
#     """
#     queried_shopping_cart = ShoppingCart.query.get_or_404(id)
#     queried_user = User.query.get_or_404(queried_shopping_cart.owner_id)


#     if queried_user.id != current_user.id:
#         return auth_error
#     else:
#         queried_shopping_cart.checked_out = True
#         db.session.commit()
#         return queried_shopping_cart.to_dict()
