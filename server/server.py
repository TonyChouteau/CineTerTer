from flask import Flask, send_from_directory, render_template

from api.handler.UserHandler import UserHandler, UsersHandler
from api.handler.OAuthHandler import OAuthHandler
from api.handler.TheMovieDBHandler import TheMovieDBHandler
from api.bdd.definitions.Hash import Hash

app = Flask(__name__)

app.secret_key = Hash.makeToken()
app.config['SESSION_TYPE'] = 'filesystem'

@app.route('/', defaults=dict(filename=None))
@app.route('/<path:filename>', methods=['GET'])
def index(filename):
    if filename:
        filename = 'public/' + filename
        return send_from_directory('.', filename)
    else:
        return render_template('index.html', isLogged=str(OAuthHandler.isAuthorized()).lower())

app.add_url_rule('/api/themoviedb/<route>/<path:url>', view_func=TheMovieDBHandler.as_view('themoviedb'), methods=['GET', 'POST'])

app.add_url_rule('/api/user/<id>', view_func=UserHandler.as_view('user'), methods=['GET', 'PATCH'])
app.add_url_rule('/api/users', view_func=UsersHandler.as_view('users'), methods=['GET', 'POST'])

app.add_url_rule('/api/login', view_func=OAuthHandler.as_view('login'), methods=['GET', 'POST'])

if __name__ == "__main__":
    app.run()
