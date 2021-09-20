import os

from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.schema import Column
from sqlalchemy.sql.sqltypes import Boolean, DateTime
from sqlalchemy.types import Integer, String, Integer
from sqlalchemy import ForeignKey

from api.bdd.definitions.User import User

Base = declarative_base()

class Review(Base):
  __tablename__ = 'movie_review'
  id = Column(Integer, primary_key=True)

  create_time = Column(DateTime)
  update_time = Column(DateTime)

  user_id = Column(Integer, ForeignKey(User.id))
  user = relationship(User, backref='reviews', lazy=True)

  movie_id = Column(String(255))

  title = Column(String(255))
  content = Column(String(255))
  grade = Column(Integer)

  in_cinema = Column(Boolean)
  already_seen = Column(Boolean)
  spoiler = Column(Boolean)

  def __repr__(self):
    return f"User(id={self.id!r}, movie={self.movie_id!r}, user={self.user_id!r}, title={self.title!r})"

  def to_dict(self):
    avatarExists = os.path.isfile(f"server/images/avatars/{self.user_id}")

    return {
        "id": self.id,
        "create_time": self.create_time,
        "title": self.title,
        "content": self.content,
        "user_id": self.user_id,
        "avatar_exists": avatarExists,
        "grade": self.grade,
        "in_cinema": self.in_cinema,
        "already_seen": self.already_seen,
        "spoiler": self.spoiler,
    }