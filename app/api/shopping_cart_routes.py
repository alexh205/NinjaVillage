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


# #* Delete an item from Shopping Cart *****************************************************
# @shopping_cart_routes.route('/remove/<int:id>', methods=['PUT'])
# @login_required
# def shopping_cart_delete(id):
#     """
#     Delete a product from a shopping_cart after checking for user ownership
#     """
#     req_data= request.json
#     queried_shopping_cart = ShoppingCart.query.get_or_404(id)
#     queried_user = User.query.get_or_404(queried_shopping_cart.owner_id)
#     queried_product = Product.query.get_or_404(req_data['productId'])

#     queried_shopping_cart = ShoppingCart.query.get_or_404(id)
#     queried_user = User.query.get_or_404(queried_shopping_cart.owner_id)
#     queried_product = Product.query.get_or_404(req_data['productId'])

#     if queried_user.id != current_user.id:
#         return auth_error
#     else:
#         if len(queried_shopping_cart.carts_product) > 0 and queried_product in queried_shopping_cart.carts_product:
#             queried_shopping_cart.carts_product.remove(queried_product)
#             db.session.commit()
#             return queried_shopping_cart.to_dict()
#         if len(queried_shopping_cart.carts_product) < 1:
#             return {'message': 'Shopping Cart is currently empty!'}


#* Add Item to Shopping Cart *****************************************************
# @shopping_cart_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def shopping_cart_edit(id):
#     """
#     Update an existing shopping_cart instance after checking for user ownership, and then add changes to database
#     """
#     req_data = request.json

#     queried_shopping_cart = ShoppingCart.query.get_or_404(id)
#     queried_user = User.query.get_or_404(queried_shopping_cart.owner_id)
    # new_product = Product.query.get_or_404(req_data['itemId'])

    # if queried_user.id != current_user.id:
    #     return auth_error
    # else:
    #     if new_product not in queried_shopping_cart.carts_product:
    #         queried_shopping_cart.carts_product.append(new_product)
    #         db.session.commit()
    #     else:
    #         return {'message': 'item is already in cart'}

    # return new_product.to_dict()


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


#* Checkout Shopping Cart *****************************************************
@shopping_cart_routes.route('/<int:id>', methods=['PUT'])
@login_required
def shopping_cart_edit(id):
    """
    Update an existing shopping_cart instance after checking for user ownership, and then adding changes to database
    """
    req_data = request.json

    queried_shopping_cart = ShoppingCart.query.get_or_404(id)
    queried_user = User.query.get_or_404(queried_shopping_cart.owner_id)

    if queried_user.id != current_user.id:
        return auth_error

    else:

        for key, val in req_data.items():
            if key == 'products':
                for product in req_data['products']:
                    print("*************************************************")
                    print(product)
                    queried_product = Product.query.get_or_404(product['id'])
                    queried_shopping_cart.carts_product.append(queried_product)
            if key != 'products' and key == 'total':
                queried_shopping_cart.total = val
            if key != 'products' and key == 'checkedOut':
                queried_shopping_cart.checked_out = val
        # print("*************************************************")
        # print(queried_shopping_cart.to_dict())
        db.session.commit()

        new_shopping_cart = ShoppingCart(
            checked_out= False,
            owner_id= current_user.id,
        )
        db.session.add(new_shopping_cart)
        db.session.commit()
        # print("#####################################################")
        # print(new_shopping_cart.to_dict())

        return new_shopping_cart.to_dict()
