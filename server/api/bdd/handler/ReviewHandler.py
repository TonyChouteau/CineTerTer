from flask import session as flask_session, request
from flask.views import MethodView
from sqlalchemy.sql.expression import select

from api.bdd.connector import session_scope
from api.bdd.definitions.Review import Review
from api.bdd.definitions.User import User
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
                review_json.append(review.to_dict_with_user())

            return makeResponse(review_json, 200)

    def post(self, movie_id):
        if not OAuthHandler.isAuthorized():
            return makeResponse("You need to be logged to see this", 401, True)

        with session_scope() as session:
            body = request.get_json()

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

            user = session.execute(
                select(User).filter_by(id=user_id)).scalar_one_or_none()

            session.query(User).filter(User.id == user_id) \
                .update({
                "xp": user.xp + 10
            })

            return makeResponse("A new user has been created", 201)


class ReviewHandler(MethodView):

    def patch(self, review_id):
        if not OAuthHandler.isAuthorized():
            return makeResponse("You need to be logged to see this", 401, True)

        with session_scope() as session:
            body = request.get_json()

            # if body is None \
            #         or body["title"] is None \
            #         or body["content"] is None \
            #         or body["isFirstTime"] is None \
            #         or body["inCinema"] is None \
            #         or body["isSpoiler"] is None:
            #     return makeResponse("Invalid data given", 400, True)

            review_query = session.query(Review).filter(Review.id == review_id)

            review = review_query.scalar_one_or_none()

            user_id = flask_session.get("user_id")
            if review is None or user_id != user_id:
                return makeResponse("You can't edit a review you don't own", 401, True)

            patched_review = {
                "title": body.get("title") or review.title,
                "content": body.get("content") or review.content,
                "grade": body.get("grade") or review.grade,
                "in_cinema": body.get("in_cinema") or review.in_cinema,
                "already_seen": body.get("already_seen") or review.already_seen,
                "spoiler": body.get("spoiler") or review.spoiler,
            }

            review_query.update(patched_review)

            return makeResponse("Review edited successfully", 201)
