from flask import request
from flask.views import MethodView

import requests

from api.bdd.handler.OAuthHandler import OAuthHandler
from api.bdd.handler.utils import makeResponse

with open('server/api/bdd/handler/.api_key') as f:
  API_KEY = f.readline().strip("\n")

ROUTES = {
    "data":  "https://api.themoviedb.org/3",
    "image": "https://image.tmdb.org/t/p"
}


class TheMovieDBHandler(MethodView):

  def get(self, route, url):
    path = request.url.split("themoviedb")[1]
    if path == "":
      return makeResponse("No Path", 400, True)

    url_route = ROUTES[route]
    if not url_route:
      return makeResponse("No root", 400, True)
    path = url_route + path.replace("data/", "").replace("image/", "")

    if not OAuthHandler.isAuthorized():
      return makeResponse("You need to be logged to see this", 401, True)

    real_url = path.replace("API_KEY", API_KEY)

    return requests.get(real_url).content
