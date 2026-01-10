from flask import request, redirect, url_for, session, g, jsonify
from api.routes.core import core

@core.route('/api/home', methods=['GET'])
def index():
    """Home page -> redirects based on auth status"""
    return jsonify({'message': 'Welcome User!'})

