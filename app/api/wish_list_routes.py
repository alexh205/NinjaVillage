from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, WishList, db

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
    return wish_list.to_dict()


#* Delete Wish List *****************************************************
@wish_list_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def wish_list_delete(id):
    """
    Delete a wish_list after checking for user ownership
    """
    queried_wish_list = wish_list.query.get_or_404(id)
    queried_user = User.query.get_or_404(queried_wish_list.owner_id)

    if queried_user.id != current_user.id:
        return auth_error
    else:
        db.session.delete(queried_wish_list)
        db.session.commit()
        return {'message': 'Successfully deleted'}

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

    return wish_list.to_dict()


#* Edit Wish List *****************************************************
@wish_list_routes.route('/<int:id>', methods=['PUT'])
@login_required
def wish_list_edit(id):
    """
    Update an existing wish_list instance after checking for user ownership, and then add changes to database
    """
    queried_wish_list = WishList.query.get_or_404(id)
    queried_user = User.query.get_or_404(queried_wish_list.owner_id)

    if queried_user.id != current_user.id:
        return auth_error
    else:
        req_data = request.json
        for key, val in req_data.items():
            if key != None and key == 'url':
                setattr(queried_wish_list, key, val)
        db.session.commit()
        return queried_wish_list.to_dict()
