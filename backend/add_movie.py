from flask import request, jsonify
from datetime import datetime
from pymongo import MongoClient
import json

def insert_movie(app, db):
    @app.route('/api/insert_movie', methods=['GET'])
    def inner_insert_movie():
        try:
            movie_json = request.args.get('movie')
            movie = json.loads(movie_json)
            result = db["movie"].insert_one(movie)
            
            return jsonify({'success': True, 'inserted_id': str(result.inserted_id)}), 200     
        except Exception as e:
            return jsonify({'error': str(e)}), 500
