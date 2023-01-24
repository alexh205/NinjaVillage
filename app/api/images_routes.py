from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Image, db

image_routes = Blueprint('images', __name__)
auth_error= "User is not authorized to complete this action"

#* Get Image *****************************************************
@image_routes.route('/<int:id>')
def image(id):
    """
    Query for an image by id and returns that review in a dictionary
    """
    image = Image.query.get_or_404(id)
    return image.to_dict()


#* Delete Image *****************************************************
@image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def image_delete(id):
    """
    Delete an image after checking for user ownership
    """
    queried_image = Image.query.get_or_404(id)
    queried_user = User.query.get_or_404(queried_image.owner_id)

    if queried_user.id != current_user.id:
        return auth_error
    else:
        db.session.delete(queried_image)
        db.session.commit()
        return {'message': 'Successfully deleted'}

#* Create Image *****************************************************
@image_routes.route('/new', methods=['POST'])
@login_required
def image_create():
    """
    Create a new review instance with or without review images, and then add to database
    """
    req_data = request.json
    new_image = Image(
        url=req_data['url'],
        review_id=req_data['review_id'],
        product_id=req_data['product_id'],
        owner_id= current_user.id,
    )
    db.session.add(new_image)
    db.session.commit()

    return new_image.to_dict()


#* Edit Image *****************************************************
@image_routes.route('/<int:id>', methods=['PUT'])
@login_required
def image_edit(id):
    """
    Update an existing image instance after checking for user ownership, and then add changes to database
    """
    queried_image = Image.query.get_or_404(id)
    queried_user = User.query.get_or_404(queried_image.owner_id)

    if queried_user.id != current_user.id:
        return auth_error
    else:
        req_data = request.json
        for key, val in req_data.items():
            if key != None and key == 'url':
                setattr(queried_image, key, val)
        db.session.commit()
        return queried_image.to_dict()
