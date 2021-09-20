

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

      print(body)

      if body is None \
				or body["title"] is None \
				or body["content"] is None \
				or body["isFirstTime"] is None \
				or body["inCinema"] is None \
				or body["isSpoiler"] is None:
        return makeResponse("Invalid data given", 400, True)
    
      user_id = flask_session.get("user_id")

      session.add(Review(
				title=body["title"],
				content=body["content"],
        movie_id=movie_id,
				user_id=user_id,
				grade=body["rating"],
				already_seen=body["isFirstTime"],
				in_cinema=body["inCinema"],
				spoiler=body["isSpoiler"]
      ))

      return makeResponse("A new user has been created", 201)
