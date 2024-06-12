from flask import request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

def get_user_favorites(app, db):
    @app.route('/api/get_user_favorites/<user_id>', methods=['GET'])
    def inner_get_user_favorites(user_id):
        try:
            user = db.user.find_one({"_id": ObjectId(user_id)})
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            favorites = user.get('Favorites', [])

            favorites_ids = [ObjectId(fid) for fid in favorites]

            movies = db.movie.find({"_id": {"$in": favorites_ids}})
            
            favorite_movies = []
            for movie in movies:
                # Converti l'ObjectId in una stringa
                movie['_id'] = str(movie['_id'])
                favorite_movies.append(movie)
            
            print(favorite_movies)
            
            return jsonify({'favorite_movies': favorite_movies}), 200
        except Exception as e:
            print("Error:", e)  # Stampa il messaggio di errore per debug
            return jsonify({'error': str(e)}), 500
