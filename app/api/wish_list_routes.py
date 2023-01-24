from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, WishList, db, Product

wish_list_routes = Blueprint('wish_lists', __name__)
auth_error= "User is not authorized to complete this action"

#* Get Wish List *****************************************************
@wish_list_routes.route('/<int:id>')
@login_required
def wish_list(id):
    """
    Query for an wish_list by id and returns that review in a dictionary
    """
    wish_list = WishList.query.get_or_404(id)
    lists= WishList.query.all()
    print(lists)
    if wish_list in lists:
        return wish_list.to_dict()
    if wish_list not in lists:
        return {'message': 'List does not exist'}



#* Delete a Wish List *****************************************************
@wish_list_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def wish_list_delete(id):
    """Delete a product from a wish_list after checking for user owners hip"""
    queried_wish_list = WishList.query.get_or_404(id)
    queried_user = User.query.get_or_404(queried_wish_list.owner_id)

    if queried_user.id != current_user.id:
        return auth_error
    else:
        db.session.delete(queried_wish_list)
        db.session.commit()
        return {'message': 'Successfully deleted'}

#* Delete a Product from a Wish List *****************************************************
@wish_list_routes.route('/<int:id>/<int:pod>', methods=['DELETE'])
@login_required
def list_prod_delete(id,pod):
    """
    Delete a product from a wish_list after checking for user ownership
    """
    queried_wish_list = WishList.query.get_or_404(id)
    queried_user = User.query.get_or_404(queried_wish_list.owner_id)
    queried_product = Product.query.get_or_404(pod)

    if queried_user.id != current_user.id:
        return auth_error
    else:
        if len(queried_wish_list.lists_product) > 0 and queried_product != None and queried_product in queried_wish_list.lists_product:
            queried_wish_list.lists_product.remove(queried_product)
            db.session.commit()
            return queried_wish_list.to_dict()
        if len(queried_wish_list.lists_product) < 1 and queried_product != None:
            return {'message': 'List is currently empty!'}
        if len(queried_wish_list.lists_product) > 0 and queried_product != None and queried_product not in queried_wish_list.lists_product:
            return {'message': 'Can not delete a product that is not currently in the list'}
        else:
            return {'message': 'This product does not exist!'}

#* Create Wish List *****************************************************
@wish_list_routes.route('/new', methods=['POST'])
@login_required
def wish_list_create():
    """
    Create a new wish_list instance, and then add to database
    """
    req_data = request.json
    new_wish_list = WishList(
        name=req_data['name'],
        owner_id= current_user.id,
    )
    db.session.add(new_wish_list)
    db.session.commit()
    if req_data['productsId'] == None:
        return new_wish_list.to_dict()
    if req_data['productsId'] != None:
        queried_wish_list = WishList.query.get_or_404(new_wish_list.id)
        for product in req_data['productsId']:
            new_product = Product.query.get_or_404(product)
            queried_wish_list.lists_product.append(new_product)
        db.session.commit()
        return new_wish_list.to_dict()

#* Edit Wish List *****************************************************
@wish_list_routes.route('/<int:id>', methods=['PUT'])
@login_required
def wish_list_edit(id):
    """
    Update an existing wish_list instance after checking for user ownership, and then add changes to database
    """
    queried_wish_list = WishList.query.get_or_404(id)
    queried_user = User.query.get_or_404(queried_wish_list.owner_id)
    req_data = request.json

    if queried_user.id != current_user.id:
        return auth_error
    else:
        if req_data['productsId']:
            for product in req_data['productsId']:
                new_product = Product.query.get_or_404(product)
                queried_wish_list.lists_product.append(new_product)
                db.session.commit()
        return queried_wish_list.to_dict()
