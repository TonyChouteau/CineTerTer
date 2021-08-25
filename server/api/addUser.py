from bdd.connector import session_scope

from datetime import datetime

from bdd.definitions.User import User
from bdd.definitions.Hash import Hash

def addUser(name, email, password):
    with session_scope() as session:
      hash, salt = Hash(password).get()
      user = User(
          create_time=datetime.now(),
          update_time=datetime.now(),
          name=name,
          email=email,
          password=hash,
          salt=salt)
      session.add(user)

addUser("Tony", "hello@tonychouteau.fr", "c8f2d6702b555fe3996cc15c46a4a633528968637fa1730197570c6fa0a4adaa")