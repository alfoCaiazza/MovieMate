from flask import request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

def get_recommended_movies(app, db):
    @app.route('/api/selected_for_you/<user_id>', methods=['GET'])
    def inner_get_recommended_movies(user_id):
        try:
            user = db.user.find_one({"_id": ObjectId(user_id)})
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            genres, favorite_movies = get_user_preferences(db, user)
            favorite_genres = analyze_favorites(favorite_movies)
            recomandation = recommend_movies(db, genres, favorite_genres, favorite_movies)

            return jsonify({'recomanded_movies': recomandation}), 200
        except Exception as e:
            print("Error:", e) 
            return jsonify({'error': str(e)}), 500

def get_user_preferences(db, user):
    genres = user.get('Genres', [])
    favorites = user.get('Favorites', [])

    favorites_ids = [ObjectId(fid) for fid in favorites]

    favorite_movies = db.movie.find({"_id": {"$in": favorites_ids}})

    return genres, list(favorite_movies)

def analyze_favorites(favorite_movies):
    favorite_genres = set()
    
    for movie in favorite_movies:
        genre = movie.get('Genre')
        genres = genre.split(',')
        for genre in genres:
            favorite_genres.add(genre)

    return favorite_genres

from bson import ObjectId

def recommend_movies(db, user_genres, favorite_genres, favorite_movies):
    combined_genres = list(set(user_genres) | set(favorite_genres))

    # Find movies whom genre is in the list of user genres but not in the favorites
    recommended_movies_cursor = db.movie.aggregate([
        #Get movie genres
        {
            "$addFields": {
                "GenreArray": {
                    "$split": ["$Genre", ", "]
                }
            }
        },
        #Filtering movies by genre
        {
            "$match": {
                "GenreArray": {
                    "$in": combined_genres
                },
                "_id": {
                    "$nin": [ObjectId(movie['_id']) for movie in favorite_movies]
                }
            }
        },
        #Set movies limit to 5
        {
            "$limit": 5
        }
    ])

    recommendations = []
    for movie in recommended_movies_cursor:
        # Step 4: Calcola il punteggio in base ai generi corrispondenti
        movie_genres = set(movie['GenreArray'])
        score = len(movie_genres & set(combined_genres))
        
        recommendations.append((score, {
            'Poster_Link': movie.get('Poster_Link'),
            'Series_Title': movie.get('Series_Title'),
            'Genre': movie.get('Genre'),
            'Overview': movie.get('Overview'),
            '_id': str(movie['_id'])
        }))

    recommendations.sort(reverse=True, key=lambda x: x[0])

    return [movie for score, movie in recommendations]

