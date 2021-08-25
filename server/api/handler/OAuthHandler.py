from flask import request, session as flask_session
import flask
from flask.views import MethodView

from datetime import datetime, timedelta

from sqlalchemy.sql.expression import select
from sqlalchemy.sql import func

from api.bdd.connector import session_scope
from api.bdd.definitions.User import User
from api.bdd.definitions.Hash import Hash
from api.handler.utils import makeResponse

tokens = {}

class Token():

  def decodeTokenId(token):
    list = token.split("_")
    if len(list) == 2:
      return int(list[1])
    else:
      return None

  def __init__(self, id):
    self.id = id
    self.hash = Hash.makeToken()+"_"+str(self.id)
    self.renew()

  def renew(self):
    self.expiration_date = datetime.now() + timedelta(hours=5)
    tokens[self.id] = self
    self.updateSession()

  def updateSession(self):
    flask_session["token"] = self.hash
    flask_session["user_id"] = self.id

  def to_dict(self):
    return  {
      "id": self.id,
      "hash": self.hash,
      "expiration_date": self.expiration_date
    }


class OAuthHandler(MethodView):

  def get(self):
    return str(OAuthHandler.isAuthorized()).lower(), 200
  
  #curl -X POST "127.0.0.1:5000/api/login" -d '{"name":"name", "password":"password"}' --header "Content-Type: application/json"
  def post(self):
    body = request.get_json()

    if "token" in body and body["token"]:
      token = Token(Token.decodeTokenId(body["token"]))
      return makeResponse(token.to_dict(), 200)

    with session_scope() as session:
      user = session.execute(select(User).filter_by(name=func.binary(body["username"]))).scalar_one_or_none()

      if user is None:
        return makeResponse("The username or password is incorrect", 401, True)
      
      hash, _ = Hash(body["password"], user.salt).get()

      if (hash == user.password):
        token = Token(user.id)
        return makeResponse("Connected", 200)
      else:
        return makeResponse("The username or password is incorrect", 401, True)

  def delete(self):
    if not OAuthHandler.isAuthorized():
      return makeResponse("You need to be logged do this", 401, True)
    
    user_id = flask_session.get("user_id")
    tokens.pop(user_id)
    flask_session.pop("token")
    flask_session.pop("user_id")

    return makeResponse("Successful signout", 200)
    

  def isAuthorized():
    user_token = flask_session.get("token")
    user_id = flask_session.get("user_id")

    if user_token is None or user_id is None:
      return False
    
    real_token = tokens[user_id]

    if real_token.hash == user_token and real_token.expiration_date >= datetime.now():
      real_token.renew()
      return True
    else:
      return False