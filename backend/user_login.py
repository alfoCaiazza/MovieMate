from flask import request, jsonify, session, redirect, url_for
from bson import ObjectId  # Importa ObjectId
from datetime import datetime
from pymongo import MongoClient
import json

def user_login(app, db):
    @app.route('/api/user_login', methods=['GET'])
    def inner_user_login():
        try:
            email = request.args.get('email')
            password = request.args.get('password')

            if not email or not password:
                return jsonify({'error': 'Email and password are required'}), 400
            
            user = db["user"].find_one({"Email": email, "Password": password})

            if not user:
                return jsonify({'error': 'Invalid email or password'}), 401

            # Converti l'ObjectId in una stringa
            user['_id'] = str(user['_id'])
            session['user'] = user

            return jsonify({'message': 'Login successful', 'user': user}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
