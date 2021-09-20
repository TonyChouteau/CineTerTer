from flask import session as flask_session, request
from flask.views import MethodView

from sqlalchemy.sql.expression import select

from api.bdd.connector import session_scope
from api.bdd.definitions.User import User
from api.bdd.handler.OAuthHandler import OAuthHandler
from api.bdd.handler.utils import makeResponse
from api.bdd.definitions.Hash import Hash


class UserHandler(MethodView):

  def get(self, id):
    if not OAuthHandler.isAuthorized():
      return makeResponse("You need to be logged to see this", 401, True)

    if not id.isnumeric():
      return self.getByName(id)

    with session_scope() as session:
      user = session.execute(
          select(User).filter_by(id=id)).scalar_one_or_none()

      if user is None:
        return makeResponse("This use doesn't exist", 404, True)

      return makeResponse(user.to_dict(), 200)

  def getByName(self, username):
    with session_scope() as session:
      user = session.execute(select(User).filter_by(
          name=username)).scalar_one_or_none()

      if user is None:
        return makeResponse("This use doesn't exist", 404, True)

      return makeResponse(user.to_dict(), 200)

  def patch(self, id):
    return "patch"


class UsersHandler(MethodView):

  def get(self):
    return "get"

  def post(self):
    if not OAuthHandler.isAdmin():
      return makeResponse("You need to be admin to do this", 401, True)

    with session_scope() as session:
      body = request.get_json()

      if body is None \
              or body["username"] is None \
              or body["email"] is None \
              or body["password"] is None:
        return makeResponse("Invalid data given", 400, True)

      hash, salt = Hash(body["password"]).get()

      session.add(User(
          name=body["username"],
          email=body["email"],
          password=hash,
          salt=salt
      ))

      return makeResponse("A new user has been created", 201)


class AnonymousUserHandler(MethodView):

  def get(self):
    if not OAuthHandler.isAuthorized():
      return makeResponse("You need to be logged to see this", 401, True)

    user_id = flask_session.get("user_id")
    with session_scope() as session:
      user = session.execute(select(User).filter_by(
          id=user_id)).scalar_one_or_none()

      return makeResponse(user.to_dict(), 200)

  def patch(self):
    if not OAuthHandler.isAuthorized():
      return makeResponse("You need to be logged to see this", 401, True)

    user_id = flask_session.get("user_id")
    with session_scope() as session:
      body = request.get_json()
      if body is None or body["password"] is None:
        return makeResponse("Invalid data given", 400, True)

      hash, salt = Hash(body["password"]).get()

      session.query(User).filter(User.id == user_id) \
          .update({
              "password": hash,
              "salt": salt
          })

      return makeResponse("Password changed", 200)
