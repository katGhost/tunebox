import os
from flask import Flask
from flask_cors import CORS
from api.extensions import db, migrate, jwt
from api.routes.core import core

def create_app():
    app = Flask(__name__)

    # configurations
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///app.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    app.register_blueprint(core)

    return app
