import os

from sqlalchemy.orm import declarative_base
from sqlalchemy.schema import Column
from sqlalchemy.sql.sqltypes import DateTime
from sqlalchemy.types import Integer, String, Integer

Base = declarative_base()


class User(Base):
  __tablename__ = 'User'
  id = Column(Integer, primary_key=True)

  create_time = Column(DateTime)
  update_time = Column(DateTime)

  name = Column(String(255))
  email = Column(String(255))

  password = Column(String(255))
  salt = Column(String(255))

  xp = Column(Integer, default=0)

  def __repr__(self):
    return f"User(id={self.id!r}, name={self.name!r}, xp={self.xp!r})"

  def to_dict(self):
    avatarExists = os.path.isfile(f"server/images/avatars/{self.id}")

    return {
        "id": self.id,
        "name": self.name,
        "email": self.email,
        "create_time": self.create_time,
        "update_time": self.update_time,
        "xp": self.xp,
        "avatar_exists": avatarExists
    }
