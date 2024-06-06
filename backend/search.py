from flask import request, jsonify
from datetime import datetime
from pymongo import MongoClient
import json

def search(app, db):
    @app.route('/api/search', methods=['GET'])
    def inner_search():
        try:
            query = request.args.get('query')
            print(f"Received search query: {query}")

            search_result = db.movie.find({"Series_Title": {"$regex": query, "$options": "i"}})
            result_list = [movie for movie in search_result]
            
            for movie in result_list:
                movie['_id'] = str(movie['_id'])

            return jsonify(result_list), 200
    
        except Exception as e:
            return jsonify({'error': str(e)}), 500
