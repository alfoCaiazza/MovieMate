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
        

def update_movie(app, db):
    @app.route('/api/update_movie/<movie_id>', methods=['PUT'])
    def update_movie_route(movie_id):
        try:
            obj_id = ObjectId(movie_id)
        except Exception as e:
            return jsonify({'error': 'Formato movie_id non valido'}), 400
        
        if not request.is_json:
            return jsonify({'error': 'La richiesta deve essere in formato JSON'}), 400
        
        updated_movie_data = request.json

        if '_id' in updated_movie_data:
            del updated_movie_data['_id']
            
        print(updated_movie_data)
        
        try:
            result = db.movie.update_one({'_id': obj_id}, {'$set': updated_movie_data})
            
            if result.matched_count == 0:
                return jsonify({'error': 'Nessun film trovato corrispondente a questo ID'}), 404
            
            return jsonify({'message': 'Film aggiornato correttamente'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
def delete_movie(app, db):
    @app.route('/api/delete_movie/<movie_id>', methods=['DELETE'])
    def update_delete_movie(movie_id):
        try:
            obj_id = ObjectId(movie_id)
            
            result = db.movie.delete_one({'_id': obj_id})
            if result.deleted_count == 1:
                return jsonify({'message': 'Film cancellato correttamente'}), 200
            else:
                return jsonify({'error': 'Errore durante la cancellazione del film'}), 500
        except Exception as e:
            return jsonify({'error': str(e)}), 500