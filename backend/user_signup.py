from flask import request, jsonify, session
from datetime import datetime
from pymongo import MongoClient
import json

def user_signup(app, db):
    @app.route('/api/user_signup', methods=['GET'])
    def inner_user_signup():
        try:
            user_json = request.args.get('user')
            user = json.loads(user_json)
            result = db["user"].insert_one(user)

            user['_id'] = str(result.inserted_id)
            session['user'] = user
            
            return jsonify({'success': True, 'inserted_id': str(result.inserted_id)}), 200     
        except Exception as e:
            return jsonify({'error': str(e)}), 500
