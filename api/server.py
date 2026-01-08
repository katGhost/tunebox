from flask import Flask, request
from flask_cors import CORS
from routes.core import core

app = Flask(__name__)
CORS(app)


app.register_blueprint(core, url_prefix='/')

if __name__ == '__main__':
    app.run(debug=True, port=8080)