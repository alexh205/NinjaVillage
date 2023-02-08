from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db


user_routes = Blueprint('users', __name__)
auth_error = "User not authorized to complete this action"


# * Get User *****************************************************
@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get_or_404(id)
    return user.to_dict()

# * Delete User *****************************************************


@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def user_delete(id):
    """
    Query for a user by id and delete user from database
    """
    queried_user = User.query.get_or_404(id)

    if queried_user.id != current_user.id:
        return auth_error
    else:
        db.session.delete(queried_user)
        db.session.commit()
        return {'message': 'Successfully deleted'}


# * Edit User *****************************************************
@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def user_edit(id):
    """
    Update an existing user instance after checking for user ownership, and then add changes to database
    """
    queried_user = User.query.get_or_404(id)

    if queried_user.id != current_user.id:
        return auth_error
    else:
        req_data = request.json
        for key, val in req_data.items():
            if key != None:
                setattr(queried_user, key, val)
        db.session.commit()
        return queried_user.to_dict()
