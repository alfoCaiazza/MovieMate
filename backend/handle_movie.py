from flask import request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

def handle_movie(app, db):
    @app.route('/api/handle_movie/<movie_id>', methods=['GET'])
    def inner_handle_movie(movie_id):
        try:
            movie = db.movie.find_one({"_id": ObjectId(movie_id)})

            if not movie:
                return jsonify({'error': 'Movie not found'}), 404

            movie['_id'] = str(movie['_id'])

            return jsonify(movie), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500

def add_to_favorites(app, db):
    @app.route('/api/add_to_favorites', methods=['POST'])
    def inner_add_to_favorites():
        try:
            user_id = request.json.get('user_id')
            movie_id = request.json.get('movie_id')

            print(movie_id, user_id)

            if not user_id or not movie_id:
                return jsonify({'error': 'user_id and movie_id are required'}), 400
            
            user_id = ObjectId(user_id)
            movie_id = ObjectId(movie_id)

            user = db.user.find_one({"_id": user_id})

            if not user:
                return jsonify({'error': 'User not found'}), 404

            db.user.update_one(
                {"_id": ObjectId(user_id)},
                {"$addToSet": {"Favorites": str(movie_id)}},
                upsert = True
            )

            return jsonify({'message': 'Movie added to favorites'}), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500

def add_rating(app, db):
    @app.route('/api/add_rating', methods=['POST'])
    def inner_add_rating():
        try:
            user_id = request.json.get('user_id')
            movie_id = request.json.get('movie_id')
            rating = request.json.get('rating')

            if not user_id or not movie_id or rating is None:
                return jsonify({'error': 'user_id, movie_id and rating are required'}), 400

            user = db.user.find_one({"_id": ObjectId(user_id)})

            if not user:
                return jsonify({'error': 'User not found'}), 404

            db.user.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": {"Ratings": {"Movie": movie_id, "Rating": int(rating), "Date" : datetime.now()}}},
                upsert = True
            )

            return jsonify({'message': 'Rating added'}), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
def user_favorites(app, db):
    @app.route('/api/user_favorites/<user_id>', methods=['GET'])
    def inner_user_favorites(user_id):
        try:
            user = db.user.find_one({"_id": ObjectId(user_id)})
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            favorites = user.get('Favorites', [])
            favorites = [str(favorite) for favorite in user.get('Favorites', [])]

            return jsonify({'favorites': favorites}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

