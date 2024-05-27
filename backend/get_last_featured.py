from flask import request, jsonify
from datetime import datetime
from pymongo import MongoClient
import json

def get_last_featured(app, db):
    @app.route('/api/trailers', methods=['GET'])
    def inner_get_last_featured():
        try:
            featured = db.movie.find().sort('Released_Year', -1).limit(5)
            items = [item for item in featured]
            for item in items:
                item['_id'] = str(item['_id'])  # Convert ObjectId to string
            return jsonify(items), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
