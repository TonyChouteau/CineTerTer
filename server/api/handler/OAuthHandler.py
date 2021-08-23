from flask import jsonify, request
from flask.views import MethodView

from datetime import date, datetime, timedelta

from sqlalchemy.sql.expression import select

from api.bdd.connector import session_scope
from api.bdd.definitions.User import User
from api.bdd.definitions.Hash import Hash

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
    self.expiration_date = datetime.now() + timedelta(minutes=30)

  def to_dict(self):
    return  {
      "id": self.id,
      "hash": self.hash,
      "expiration_date": self.expiration_date
    }


class OAuthHandler(MethodView):
  
  #curl -X POST "127.0.0.1:5000/api/login" -d '{"name":"name", "password":"password"}' --header "Content-Type: application/json"
  def post(self):
    body = request.get_json()

    with session_scope() as session:
      user = session.execute(select(User).filter_by(name=body["name"])).scalar_one_or_none()

      if user is None:
        return "The username or password is incorrect", 401
      
      hash, _ = Hash(body["password"], user.salt).get()

      if (hash == user.password):
        token = Token(user.id)
        tokens[user.id] = token
        return jsonify(token.to_dict()), 200
      else:
        return "The username or password is incorrect", 401
  
  def isAuthorized(user_token):
    id = Token.decodeTokenId(user_token)
    if id is None or user_token is None or not id in tokens:
      return False
    
    real_token = tokens[id]

    if real_token.hash == user_token and real_token.expiration_date >= datetime.now():
      real_token.renew()
      return True
    else:
      return False