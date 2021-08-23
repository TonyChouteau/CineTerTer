from flask import Flask, request, jsonify, send_from_directory
import re

from api.handler.UserHandler import UserHandler, UsersHandler
from api.handler.OAuthHandler import OAuthHandler

app = Flask(__name__)

@app.route('/', defaults=dict(filename=None))
@app.route('/<path:filename>', methods=['GET', 'POST'])
def index(filename):
    filename = re.sub("^movie/", "", filename or "")
    print(filename)
    filename = ('public/' + filename) if filename else 'public/index.html'
    if request.method == 'GET':
        return send_from_directory('.', filename)

    return jsonify(request.data)

app.add_url_rule('/api/user/<id>', view_func=UserHandler.as_view('user'), methods=['GET', 'PATCH'])
app.add_url_rule('/api/users', view_func=UsersHandler.as_view('users'), methods=['GET', 'POST'])

app.add_url_rule('/api/login', view_func=OAuthHandler.as_view('login'), methods=['POST'])

if __name__ == "__main__":
    app.run()
