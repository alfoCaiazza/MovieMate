from flask import request, jsonify
from datetime import datetime
from pymongo import MongoClient
import json

def get_featured(app, db):
    @app.route('/api/featured', methods=['GET'])
    def inner_get_featured():
        try:
            featured = db.movie.aggregate([{'$sample': {'size': 5}}])
            items = [item for item in featured]
            for item in items:
                item['_id'] = str(item['_id'])  # Convert ObjectId to string
            return jsonify(items), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500