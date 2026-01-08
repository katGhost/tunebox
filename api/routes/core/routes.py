from flask import request, render_template, redirect, url_for, session, g, jsonify
from . import core

@core.route('/api/home', methods=['GET'])
def index():
    """Home page -> redirects based on auth status"""
    return jsonify({'message': 'Hello There from Flask API'})

