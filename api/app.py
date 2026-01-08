from flask import Flask, request
from routes.core import core

app = Flask(__name__)

app.register_blueprint(core, url_prefix='/')

if __name__ == '__main__':
    app.run(debug=True)