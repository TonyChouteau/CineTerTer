from flask import session as flask_session
from flask.views import MethodView
from flask import send_from_directory, request

import os

from api.bdd.handler.utils import makeResponse
from api.bdd.handler.OAuthHandler import OAuthHandler

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
  return '.' in filename and \
         filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class AvatarHandler(MethodView):

  def get(self):
    if not OAuthHandler.isAuthorized():
      return makeResponse("You need to be logged do this", 401, True)

    id = flask_session.get("user_id")
    return send_from_directory('./images/avatars/', str(id))

  def post(self):
    if not OAuthHandler.isAuthorized():
      return makeResponse("You need to be logged do this", 401, True)

    if 'file' not in request.files:
      return makeResponse("No file part", 400, True)

    file = request.files['file']
    if file.filename == '':
      return makeResponse("No selected file", 400, True)
    if file and allowed_file(file.filename):
      id = flask_session.get("user_id")
      file.save(os.path.join('./server/images/avatars/', str(id)))
      return makeResponse("File saved", 201)
