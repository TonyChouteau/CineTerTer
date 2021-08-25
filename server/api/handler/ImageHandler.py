from flask import session as flask_session
from flask.views import MethodView
from flask import send_from_directory

from api.handler.utils import makeResponse
from api.handler.OAuthHandler import OAuthHandler

class ImageHandler(MethodView):
  
	def get(self, filename):
		if not OAuthHandler.isAuthorized():
			return makeResponse("You need to be logged do this", 401, True)

		return send_from_directory('./images/', filename)
