

from types import MethodType
from flask import session as flask_session, request
from flask.views import MethodView

from sqlalchemy.sql.expression import select

from api.bdd.connector import session_scope
from api.bdd.definitions.Review import Review
from api.bdd.handler.OAuthHandler import OAuthHandler
from api.bdd.handler.utils import makeResponse


class ReviewsHandler(MethodView):

  def get(self, movie_id):
    if not OAuthHandler.isAuthorized():
      return makeResponse("You need to be logged to see this", 401, True)
    
    with session_scope() as session:
      reviews = session.execute(
        select(Review).filter_by(movie_id=movie_id)).scalars().all()
      
      review_json = []
      for review in reviews:
        review_json.append(review.to_dict())

      return makeResponse(review_json, 200)

  def post(self, movie_id):
    if not OAuthHandler.isAuthorized():
      return makeResponse("You need to be logged to see this", 401, True)
    
    with session_scope() as session:
      body = request.get_json()

      if body is None \
				or body["title"] is None \
				or body["content"] is None \
				or body["already_seen"] is None \
				or body["in_cinema"] is None \
				or body["spoiler"] is None:
        return makeResponse("Invalid data given", 400, True)
    
      user_id = flask_session.get("user_id")

      session.add(Review(
				title=body["title"],
				content=body["content"],
				user_id=user_id,
				grade=body["grade"] if "grade" in body else None,
				already_seen=body["already_seen"],
				in_cinema=body["in_cinema"],
				spoiler=body["spoiler"]
      ))

      return makeResponse("A new user has been created", 201)
