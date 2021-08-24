from flask import jsonify, request, session
from flask.views import MethodView

import requests

from api.bdd.connector import session_scope
from api.handler.OAuthHandler import OAuthHandler

with open('server/api/handler/.api_key') as f:
  API_KEY = f.readline()

ROUTES = {
  "data":  "https://api.themoviedb.org/3",
  "image": "https://image.tmdb.org/t/p"
}

class TheMovieDBHandler(MethodView):

  def get(self, route, url):
    path = request.url.split("themoviedb")[1]
    if path == "":
      return "No Path", 400

    url_route = ROUTES[route]
    if not url_route:
      return "No root", 400
    path = url_route + path.replace("data/", "").replace("image/", "")
    
    if not OAuthHandler.isAuthorized():
      return "You need to be logged to see this", 401
    
    real_url = path.replace("API_KEY", API_KEY)

    return requests.get(real_url).content