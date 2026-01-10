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


"""Artist"""
class Artist(db.Model):
    __tablename__ = 'artists'

    id = db.Column(db.Integer, primary_key=True)
    artist_name = db.Column(db.String(255), unique=True, nullable=False)

    # Relationships
    albums = db.relationship('Album', back_populates='artist', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Artist: {self.artist_name}>'


"""Album"""
class Album(db.Model):
    __tablename__ = 'albums'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), unique=False, nullable=False)
    artist = db.Column(db.String(255), db.ForeignKey('artist_name'))
    release_year = db.Column(db.Integer)

    # Relationships
    tracks = db.relationship(
        "Track",
        back_populates="album",
        cascade="all, delete-orphan",
        order_by="Track.track_number"
    )
    artist = db.relationship('Artist', back_populates='album')

class Track(db.Model):
    __tablename__ = "tracks"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    duration_seconds = db.Column(db.Integer)
    track_number = db.Column(db.Integer)

    # Relationships
    album_id = db.Column(db.Integer, db.ForeignKey("albums.id"), nullable=False)
    album = db.relationship("Album", back_populates="tracks")