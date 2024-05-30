from flask import request, jsonify
from datetime import datetime
from pymongo import MongoClient
import json

def get_users(app, db):
    @app.route('/api/get_users', methods=['GET'])
    def inner_get_users():
        try:
            featured = db.user.find()
            items = [item for item in featured]
            for item in items:
                item['_id'] = str(item['_id'])  # Convert ObjectId to string
            return jsonify(items), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500