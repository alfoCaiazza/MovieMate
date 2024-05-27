from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
import os
from backend.default_routes import setup_routes
from backend.add_movie import insert_movie
from backend.get_featured import get_featured
from backend.get_last_featured import get_last_featured

app = Flask(__name__)
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


setup_routes(app)
insert_movie(app, db)
get_featured(app, db)
get_last_featured(app, db)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "We reached the top!"}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
