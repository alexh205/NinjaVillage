from flask import Blueprint, jsonify, session, request
import random
from app.models import User, db, ShoppingCart
from app.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


def create_random_username(usernames):
    rand_username = ''
    rand_len = random.randint(3, 10)
    # Generate a random length for the username (between 3 and 10)
    chars = ['A', 'E', 'I', 'O', 'U', 'Y', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W', 'X', 'Z', 'Q', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    for i in range(0, rand_len):
        random_index = random.randint(0, len(chars)-1)
        # Append random characters to empty string for the length of the username
        rand_username += str(chars[random_index])
        i += 1

    # If the username exists in existing usernames (passed as parameters), recurse
    if rand_username.lower() in usernames:
        return create_random_username(usernames)
    # Otherwise, return the new username
    return rand_username


def create_random_password():
    rand_password = ''
    rand_len = random.randint(8, 12)
    chars = ['A', 'E', 'I', 'O', 'U', 'Y', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W', 'X', 'Z', 'Q', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    for i in range(0, rand_len):
        random_index = random.randint(0, len(chars)-1)
        rand_password += str(chars[random_index])
        i += 1

    return rand_password


#* Login *****************************************************
@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#* Logout *****************************************************
@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}

#* Signup New User *****************************************************
@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            name=form.data['name'],
            street_address=form.data['street_address'],
            city=form.data['city'],
            state=form.data['state'],
            zip_code=form.data['zip_code'],
            profile_img=form.data['profile_img']
        )
        db.session.add(user)
        db.session.commit()

        ''' addition of a new shopping cart to the newly created user'''
        new_cart = ShoppingCart(
            checked_out= False,
            owner_id= user.id
        )
        db.session.add(new_cart)
        db.session.commit()

        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/signup/random', methods=['POST'])
def create_random_user():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    all_users = User.query.all()

    usernames_ls = []
    # Get the usernames of all users and append to list
    for user in all_users:
        username = getattr(user, 'user_name')
        usernames_ls.append(username.lower())

    random_username = create_random_username(usernames_ls)
    # Add username + @domain_name for email
    random_email = random_username + '@ninjaVillage.com'
    random_password = create_random_password()

    new_user = User(
        user_name=random_username,
        user_email=random_email,
        password=random_password,
        name='James Doe',
        street_address='987 Broad Street',
        city='New York',
        state='NY',
        zip_code=1234,
        profile_img='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2831&q=80'
    )

    db.session.add(new_user)
    db.session.commit()
    # login_user(new_user)

    return {'id': new_user.id, 'status': 200}
