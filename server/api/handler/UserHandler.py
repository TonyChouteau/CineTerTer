from flask import jsonify, request
from flask.views import MethodView

from sqlalchemy.sql.expression import select

from api.bdd.connector import session_scope
from api.bdd.definitions.User import User
from api.handler.OAuthHandler import OAuthHandler

def to_dict(user):
  return {
      "id": user.id,
      "name": user.name,
      "create_time": user.create_time,
      "update_time": user.update_time,
      "xp": user.xp
    }

class UserHandler(MethodView):

  def get(self, id):
    body = request.get_json()

    if not id.isnumeric():
      return self.getByName(id, body)

    with session_scope() as session:
      user = session.execute(select(User).filter_by(id=id)).scalar_one_or_none()

      if body is None or not OAuthHandler.isAuthorized(body["token"]):
        return "You need to be logged to see this", 401
      
      if user is None:
        return "", 404

      return jsonify(to_dict(user)), 200

  def patch(self, id):
    return "patch"

  def getByName(self, username, body):
    with session_scope() as session:
      user = session.execute(select(User).filter_by(name=username)).scalar_one_or_none()

      if body is None or not OAuthHandler.isAuthorized(body["token"]):
        return "You need to be logged to see this", 401

      if user is None:
        return "", 404

      return jsonify(to_dict(user)), 200

class UsersHandler(MethodView):

  def get(self):
    return "get"
  
  def post(self):
    return "post"