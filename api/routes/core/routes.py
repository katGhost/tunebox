from flask import request, redirect, url_for, session, g, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.routes.core import core
from api.models.models import User


@core.route('/api/home', methods=['GET'])
@jwt_required()
def index():
    """Home page -> redirects based on auth status"""
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    return jsonify({'message': f'Welcome User! {user}'})


"""Create an endpoint for navifgation bar"""
def navigate():
    ...

"""Endpoint for pulling artists"""
def artists():
    ...