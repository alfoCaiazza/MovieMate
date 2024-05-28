from flask import request, jsonify, session
from datetime import datetime
from pymongo import MongoClient
import json

def get_current_user(app):
    @app.route('/api/get_current_user', methods=['GET'])
    def inner_get_current_user():
        try:
            user = session.get('user')
            if user:
                return jsonify({'user': user}), 200
            else:
                return jsonify({'user': None}), 200   
        except Exception as e:
            return jsonify({'error': str(e)}), 500
