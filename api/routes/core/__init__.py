from flask import Blueprint

core = Blueprint('core', __name__)

from api.routes.core import routes