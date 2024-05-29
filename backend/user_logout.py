from flask import request, jsonify, session

def user_logout(app):
    @app.route('/api/user_logout', methods=['POST'])
    def inner_user_logout():
        session.pop('user', None)
        return jsonify({'message': 'Logout successful', 'redirect': '/'})
