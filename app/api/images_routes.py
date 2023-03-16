from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Image, db, Product
from app.aws_upload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint('images', __name__)
auth_error = "User is not authorized to complete this action"


# * Get Image *****************************************************
@image_routes.route('/<int:id>')
def image_get(id):
    """
    Query for an image by id and returns that review in a dictionary
    """
    image = Image.query.get_or_404(id)
    return image.to_dict()


# * Delete Image *****************************************************
@image_routes.route('/<int:id>/<int:prodId>', methods=['DELETE'])
@login_required
def image_delete(id, prodId):
    """
    Delete an image after checking for user ownership
    """

    queried_image = Image.query.get_or_404(id)
    queried_product = Product.query.get_or_404(queried_image.product_id)
    queried_user = User.query.get_or_404(queried_image.owner_id)

    if queried_user.id != current_user.id:
        return auth_error
    else:
        db.session.delete(queried_image)
        db.session.commit()

        return queried_product.to_dict()

# * Create Image *****************************************************


@image_routes.route('/new', methods=['POST'])
@login_required
def image_create():
    image = request.files["image"]

    if "image" not in request.files:
        return {"errors": "image required"}, 400

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)



    if "url" not in upload:
        # if the url key doesn't exist in the dictionary
        # it indicates there was an error during the upload
        return upload, 400

    url = upload["url"]

    # form = ImageForm()
    # form['csrf_token'].data = request.cookies['csrf_token']

    new_image = Image(owner_id=current_user.get_id(), url=url,
                      review_id=request.form['reviewId'], product_id=request.form['productId'])
    
    db.session.add(new_image)
    db.session.commit()

    return new_image.to_dict()


# * Edit Image *****************************************************
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
