from flask import request, jsonify, session, redirect, url_for
from bson import ObjectId  # Importa ObjectId
from datetime import datetime
from pymongo import MongoClient
import json

def user_login(app, db):
    @app.route('/api/user_login', methods=['GET'])
    def inner_user_login():
        try:
            # Esegui la normalizzazione
            normalize_user_data(db)
            email = request.args.get('email')
            password = request.args.get('password')

            # Normalizza l'email rimuovendo spazi e convertendo in minuscolo
            email = email.strip().lower() if email else None
            password = password.strip() if password else None

            print("Email received:", email)
            print("Password received:", password)

            if not email or not password:
                return jsonify({'error': 'Email and password are required'}), 400

            # Cerca l'utente usando email e password
            user = db.user.find_one({"Email": email, "Password": password})

            print("Querying for user with email:", email)
            print("User found:", user)

            if not user:
                return jsonify({'error': 'Invalid email or password'}), 401

            # Converti l'ObjectId in una stringa
            user['_id'] = str(user['_id'])
            session['user'] = user

            return jsonify({'message': 'Login successful', 'user': user}), 200
        except Exception as e:
            print("Exception occurred:", str(e))
            return jsonify({'error': str(e)}), 500
        
def normalize_user_data(db):
    users = db.user.find()
    for user in users:
        # Rimuovi spazi e converti l'email in minuscolo
        email = user.get("Email", "").strip().lower()
        password = user.get("Password", "").strip()

        # Aggiorna i documenti con i nuovi valori normalizzati
        db.user.update_one(
            {"_id": user["_id"]},
            {"$set": {"Email": email, "Password": password}}
        )

