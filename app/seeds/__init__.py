from flask.cli import AppGroup
from .users_demo import seed_users, undo_users
from .products_demo import seed_products, undo_products
from .reviews_demo import seed_reviews, undo_reviews
from .images_demo import seed_images, undo_images
from .shopping_carts_demo import seed_shopping_carts, undo_shopping_carts
from .wish_lists_demo import seed_wish_lists, undo_wish_lists
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
        # db.session.execute(f"TRUNCATE table {SCHEMA}.wish_lists RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.shopping_carts RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")

        db.session.commit()
    else:
        undo_users()
        undo_products()
        undo_shopping_carts()
        # undo_wish_lists()
        undo_reviews()
        undo_images()


    seed_users()
    seed_products()
    seed_shopping_carts()
    # seed_wish_lists()
    seed_reviews()
    seed_images()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_products()
    undo_shopping_carts()
    # undo_wish_lists()
    undo_reviews()
    undo_images()
