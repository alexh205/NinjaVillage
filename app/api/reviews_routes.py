from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Review, Image, db

review_routes = Blueprint('reviews', __name__)
auth_error= "User is not authorized to complete this action"


#* Get Review *****************************************************
@review_routes.route('/<int:id>')
def review(id):
    """
    Query for a review by id and returns that review in a dictionary
    """
    review = Review.query.get_or_404(id)
    return review.to_dict()

#* Delete Review *****************************************************
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def review_delete(id):
    """
    Delete a review after checking for user ownership
    """
    queried_review = Review.query.get_or_404(id)
    queried_user = User.query.get_or_404(queried_review.owner_id)

    if queried_user.id != current_user.id:
        return auth_error
    else:
        db.session.delete(queried_review)
        db.session.commit()
        return {'message': 'Successfully deleted'}


#* Create Review *****************************************************
@review_routes.route('/new', methods=['POST'])
@login_required
def review_create():
    """
    Create a new review instance with or without review images, and then add to database
    """
    req_data = request.json
    new_review = Review(
        title=req_data['title'],
        review=req_data['review'],
        rating=req_data['rating'],
        product_id=req_data['product_id'],
        owner_id= current_user.id,
    )
    db.session.add(new_review)
    db.session.commit()

    if req_data['images'] == None:
        return new_review.to_dict()
    else:
        queried_review = Review.query.get_or_404(new_review.id)

        for image in req_data['images']:
            new_image = Image(
                url= image,
                owner_id= current_user.id,
                product_id=req_data['product_id'],
                review_id= queried_review.id
            )
            db.session.add(new_image)
            db.session.commit()
        return new_review.to_dict()


#* Edit Review *****************************************************
@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def review_edit(id):
    """
    Update an existing review instance after checking for user ownership, and then add changes to database
    """
    queried_review = Review.query.get_or_404(id)
    queried_user = User.query.get_or_404(queried_review.owner_id)

    if queried_user.id != current_user.id:
        return auth_error
    else:
        req_data = request.json
        for key, val in req_data.items():
            if key != None:
                setattr(queried_review, key, val)
        db.session.commit()
        return queried_review.to_dict()
