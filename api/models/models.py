from api.extensions import db
from flask_login import UserMixin
from sqlalchemy import text

"""user model"""
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, server_default=text('CURRENT_TIMESTAMP'))
    is_active = db.Column(db.Boolean, default=True)
    
    def __repr__(self):
        return f'<User: {self.username}>'
    
    # Relationships
    ...