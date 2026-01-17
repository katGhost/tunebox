import os
from flask import Flask
from flask_cors import CORS
from api.extensions import db, migrate, jwt
from api.routes.core import core
from api.routes.auth import auth

def create_app():
    app = Flask(__name__)

    # configurations
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///app.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

    # Initializations
    db.init_app(app)
    jwt.init_app(app)

    # blueprint apps registration
    app.register_blueprint(core, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/auth/')

    migrate.init_app(app, db)

    return app
