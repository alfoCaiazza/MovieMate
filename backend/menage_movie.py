from flask import request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

def manage_movie(app, db):
    @app.route('/api/manage_movie/<string:movie_id>', methods=['GET'])
    def inner_manage_movie(movie_id):
        try:
            print('Movie id: ', movie_id)
            movie = db.movie.find_one({"_id": ObjectId(movie_id)})

            if not movie:
                return jsonify({'error': 'Movie not found'}), 404

            movie['_id'] = str(movie['_id'])

            return jsonify(movie), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500