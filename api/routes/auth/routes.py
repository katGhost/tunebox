from flask import request, redirect, url_for, session, g, jsonify
from api.extensions import jwt, db, bcrypt
from api.models.models import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from api.routes.auth import auth

@auth.route('/users', methods=['GET'])
@jwt_required()
def get_name():
    #username = request.form.get('')
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()

    #check if any user exists
    if not user:
        return jsonify({'msg': 'No user added yet'})
    else:
        return jsonify({'msg': 'User found', 'username': User.username})


# Register/Signup route
@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'GET':
        username = 'Kat'
        user = User.query.where(User.username==username).first()
        return jsonify({'msg': 'endpoint alive!', 'user': user})
    if request.method == 'POST':
        data = request.get_json() or {}
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        print('Received data:', username , password)

        if not username or not email or not password:
            return jsonify({'msg': 'All fields are required!'}), 400
        
        # look for user in db is user exists -> look by username
        user = User.query.filter_by(username=username).first()
        if user:
            return jsonify({'msg': 'User already exists!'}), 409
        
        # hash
        hash = bcrypt.generate_password_hash(password).decode("utf-8")
        access_token = create_access_token(User.id)
        
        # create new user
        new_user = User(username=username, email=email, password_hash=hash) #type: ignore

        # add new user to the db
        db.session.add(new_user)
        db.session.commit()
    
    # Get request
    return jsonify({
        "success": True,
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
        }
    }), 201

"""Login"""



# When entity is not authorized
@auth.route('/unauthorized', methods=['GET', 'POST'])
def unauthorized():
    ...
    return jsonify({'message': 'Who daF you are?'}), 401