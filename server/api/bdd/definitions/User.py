from sqlalchemy.orm import declarative_base, relationship
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
