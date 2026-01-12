from flask import request, redirect, url_for, session, g, jsonify
from api.extensions import jwt, db, bcrypt
from api.models.models import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from api.routes.auth import auth

@auth.route('/get_name', methods=['GET'])
@jwt_required()
def get_name():
    #username = request.form.get('')
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()

    #check if any user exists
    if not user:
        return redirect(url_for('auth.unauthorized')), 302
    else:
        return jsonify({'msg': 'User found', 'username': User.username})


# Register/Signup route
@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        email = data['email']
        password = data['password']
        confirm_password = data['confirm-password']
        print('Received data:', username , password)

        if not username or not email:
            return jsonify({'msg': 'Required fileds!'})
        
        # passwrod must match password re-entry
        if password != confirm_password:
            return jsonify({'msg': 'Password must match!'})
        
        # look for user in db is user exists -> look by username
        user = User.query.filter_by(username=username).first()
        
        # hash
        hash = bcrypt.generate_password_hash(password).decode("utf-8")
        
        
        # create new user
        new_user = User(username=username, email=email, password_hash=hashed) #type: ignore

        # add new user to the db
        db.session.add(new_user)
        db.session.commit()
    
    # Get request
    return jsonify({'msg': 'You need to sign in'})

"""Login"""



# When entity is not authorized
@auth.route('/unauthorized', methods=['GET', 'POST'])
def unauthorized():
    ...
    return jsonify({'message': 'Who daF you are?'}), 401