from flask import Flask, request, jsonify, send_from_directory
import re

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

@app.route('/api')
def api():
    return "Hello world"

if __name__ == "__main__":
    app.run()