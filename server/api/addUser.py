from bdd.connector import session_scope

from datetime import datetime

from bdd.definitions.User import User
from bdd.definitions.Hash import Hash

def addUser(name, password):
    with session_scope() as session:
      hash, salt = Hash(password).get()
      user = User(
          create_time=datetime.now(),
          update_time=datetime.now(),
          name=name,
          password=hash,
          salt=salt)
      session.add(user)

addUser("Tony", "fuckingPassword")