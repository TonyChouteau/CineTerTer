from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from contextlib import contextmanager

import json

with open('server/api/bdd/.login_secret.json') as f:
  login = json.load(f)

engine = create_engine(
    f"{login['type']}+mysqldb://{login['user']}:{login['pwd']}@{login['url']}/{login['database']}")
Session = sessionmaker(engine)
  
@contextmanager
def session_scope():
  """Provide a transactional scope around a series of operations."""
  session = Session()
  try:
    yield session
    session.commit()
  except BaseException:
    session.rollback()
    raise
  finally:
    session.close()

# class Connector():
#   def session(self):
#     with session_scope() as session:
#       hash, salt = Hash("password").get()
#       user = User(
#           create_time=datetime.now(),
#           update_time=datetime.now(),
#           name="Tony",
#           password=hash,
#           salt=salt)
#       session.add(user)

