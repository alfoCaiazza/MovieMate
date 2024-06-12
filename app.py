from flask import Flask, render_template, jsonify, request, session
from flask_session import Session
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
import os
import secrets
from backend.default_routes import setup_routes
from backend.add_movie import insert_movie
from backend.get_featured import get_featured
from backend.get_last_featured import get_last_featured
from backend.user_login import user_login
from backend.user_signup import user_signup
from backend.get_current_user import get_current_user
from backend.user_logout import user_logout
from backend.get_movies import get_movies
from backend.get_users import get_users
from backend.search import search
from backend.handle_movie import add_rating, add_to_favorites, handle_movie, user_favorites
from backend.get_favorites import get_user_favorites

app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_hex(16)
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
CORS(app)

load_dotenv()

#Configure MongoDB connection
mongo_uri = os.getenv('MONGO_URI')
db_name = os.getenv('MONGO_DB_NAME')
try:
    mongo_client = MongoClient(mongo_uri)
    db = mongo_client.get_database(db_name)
    print(f' * Connected to \'{db_name}\' database')
except Exception as e:
    print(f'Error while connecting to database: {str(e)}')

get_current_user(app)
setup_routes(app)
insert_movie(app, db)
get_featured(app, db)
get_last_featured(app, db)
user_login(app, db)
user_signup(app, db)
user_logout(app)
get_movies(app, db)
get_users(app, db)
search(app, db)
handle_movie(app, db)
add_to_favorites(app, db)
add_rating(app, db)
user_favorites(app, db)
get_user_favorites(app, db)

if __name__ == '__main__':
    app.run(debug=True)
