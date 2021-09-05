from flask import session as flask_session
from flask.views import MethodView

from sqlalchemy.sql.expression import select

from api.bdd.connector import session_scope
from api.bdd.definitions.User import User
from api.bdd.handler.OAuthHandler import OAuthHandler
from api.bdd.handler.utils import makeResponse


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
    return "post"


class AnonymousUserHandler(MethodView):

  def get(self):
    if not OAuthHandler.isAuthorized():
      return makeResponse("You need to be logged to see this", 401, True)

    user_id = flask_session.get("user_id")
    print(user_id)
    with session_scope() as session:
      user = session.execute(select(User).filter_by(
          id=user_id)).scalar_one_or_none()

      return makeResponse(user.to_dict(), 200)
