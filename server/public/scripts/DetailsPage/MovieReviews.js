var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var movieReviewsStyles = makeStyles(function (theme) {
  return {
    root: {
      width: "100%"
    },
    titlePaper: {
      background: THEME.palette.secondary.background,
      color: THEME.palette.primary.text,
      padding: "5px 0"
    },
    margin: {
      margin: "10px"
    },
    centerText: {
      textAlign: "center"
    },
    flexRow: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row"
    },
    whiteText: {
      color: "white"
    },
    head: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    },
    card: {
      width: "calc(100% - 20px)",
      display: "flex",
      flexDirection: "column",
      margin: "10px",
      background: "unset"
    },
    reviewContentContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      paddingBottom: "16px"
    },
    reviewContent: {
      display: "flex",
      flexDirection: "column",
      width: "calc(100% - 50px)",
      paddingLeft: "10px"
    },
    overlayContainer: {
      position: "relative"
    },
    inputRoot: {
      margin: theme.spacing(1),
      width: "40%",
      "& label": {
        color: THEME.palette.primary.text
      },
      "& textarea": {
        color: THEME.palette.primary.text
      },
      "& input": {
        color: THEME.palette.primary.text
      }
    },
    fullWidth: {
      width: "100%"
    },
    content: {
      padding: "0 26px"
    },
    media: {
      height: "50px",
      width: "50px",
      borderRadius: "25px",
      backgroundPosition: "top"
    },
    title: {
      fontSize: "18px"
    },
    submitButton: {
      width: "200px",
      height: "50px",
      marginTop: "27px"
    },
    marginLeft: {
      marginLeft: "10px"
    },
    error: {
      color: "red"
    },
    overlay: {
      position: "absolute",
      background: THEME.palette.primary.background,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 5,
      justifyContent: "center"
    },
    multiline: {
      whiteSpace: "pre-wrap"
    },
    height: {
      height: "100px"
    },
    greyText: {
      color: THEME.palette.secondary.text
    }
  };
});

function MovieReviews(props) {
  var classes = movieReviewsStyles();

  var _React$useState = React.useState({
    reviews: null,
    error: false,
    submit: false,
    errorMessage: null
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  var newReviewData = {
    reviewRating: 0,
    reviewIsRating: true,
    inCinema: false,
    isFirstTime: true,
    isSpoiler: false
  };

  // Rating
  function onRatingChange(rating) {
    newReviewData.reviewRating = rating;
  }

  function hideRating(isChecked) {
    if (isChecked) {
      $(".rating_edit").hide();
      newReviewData.reviewIsRating = false;
    } else {
      $(".rating_edit").show();
      newReviewData.reviewIsRating = true;
    }
  }

  // Checkbox

  function changeInCinema() {
    newReviewData.inCinema = !newReviewData.inCinema;
  }

  function changeIsFirstTime() {
    newReviewData.isFirstTime = !newReviewData.isFirstTime;
  }

  function changeIsSpoiler() {
    newReviewData.isSpoiler = !newReviewData.isSpoiler;
  }

  // Submit
  function onSubmit() {
    var title = $("input", ".review_title").val();
    var content = $("textarea", ".review_content").val();
    if (title.length < 3 || content.length < 20) {
      setState(Object.assign({}, state, {
        error: true,
        errorMessage: translateAll("not_enough", props.lang)
      }));
      return "";
    }
    fetch(getReviewsUrl(props.movieId), {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        title: title,
        content: content,
        rating: newReviewData.reviewIsRating ? newReviewData.reviewRating : null,
        inCinema: newReviewData.inCinema,
        isFirstTime: newReviewData.isFirstTime,
        isSpoiler: newReviewData.isSpoiler
      })
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.status === 201) {
        setState(Object.assign({}, state, {
          error: false,
          submit: true,
          reviews: null,
          errorMessage: null
        }));
      } else {
        setState(Object.assign({}, state, {
          errorMessage: data.error || translateAll("error", props.lang)
        }));
      }
    });
  }

  if (!state.reviews) {
    fetch(getReviewsUrl(props.movieId), {
      method: "GET"
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.status === 200) {
        setState(Object.assign({}, state, { reviews: data.data }));
      }
    });
  }

  function RenderSubmit() {
    if (state.submit) {
      return React.createElement(
        "div",
        { className: makeClass(classes.overlay, classes.flexRow) },
        React.createElement(
          Typography,
          { className: classes.whiteText, variant: "h6" },
          translateMoviePage("submit", props.lang)
        )
      );
    } else {
      return "";
    }
  }

  return React.createElement(
    "div",
    { className: classes.root },
    React.createElement(
      "div",
      { className: classes.head },
      React.createElement(
        Typography,
        {
          className: makeClass(classes.margin, classes.centerText),
          variant: "h5"
        },
        translateMoviePage("review", props.lang)
      ),
      React.createElement(
        Card,
        {
          className: classes.card,
          style: { border: "none", boxShadow: "none" }
        },
        React.createElement(
          CardContent,
          {
            className: makeClass(classes.overlayContainer, state.submit ? classes.height : "")
          },
          React.createElement(RenderSubmit, null),
          React.createElement(
            Typography,
            {
              className: makeClass(classes.margin, classes.whiteText),
              variant: "h6"
            },
            translateMoviePage("add_review_title", props.lang)
          ),
          React.createElement(
            "div",
            { className: classes.flexRow },
            React.createElement(TextField, {
              className: makeClass(classes.inputRoot, classes.whiteText, "review_title"),
              variant: "outlined",
              label: translateMoviePage("review_title", props.lang)
            }),
            React.createElement(CheckBoxLabel, {
              className: classes.marginLeft,
              onClick: changeInCinema,
              label: translateMoviePage("in_cinema", props.lang)
            }),
            React.createElement(CheckBoxLabel, {
              className: classes.marginLeft,
              onClick: changeIsFirstTime,
              checked: true,
              label: translateMoviePage("is_first_time", props.lang)
            }),
            React.createElement(CheckBoxLabel, {
              className: classes.marginLeft,
              onClick: changeIsSpoiler,
              label: translateMoviePage("is_spoiler", props.lang)
            })
          ),
          React.createElement(TextField, {
            className: makeClass(classes.inputRoot, classes.fullWidth, classes.whiteText, "review_content"),
            variant: "outlined",
            label: translateMoviePage("review_comment", props.lang),
            multiline: true
          }),
          React.createElement(
            "div",
            { className: classes.flexRow },
            React.createElement(CheckBoxLabel, {
              className: classes.marginLeft,
              onClick: hideRating,
              label: translateMoviePage("is_rating", props.lang)
            }),
            React.createElement(Rating, {
              className: makeClass(classes.margin, "rating_edit"),
              value: 5,
              input: true,
              changeReview: onRatingChange
            })
          ),
          React.createElement(
            Error,
            {
              error: state.error,
              className: makeClass(classes.error, classes.marginLeft)
            },
            state.errorMessage || translateMoviePage("error", props.lang)
          ),
          React.createElement(
            Button,
            {
              id: "login",
              variant: "contained",
              color: "primary",
              className: makeClass(classes.inputRoot, classes.whiteText, classes.submitButton),
              onClick: onSubmit
            },
            translateMoviePage("add_review", props.lang)
          )
        )
      )
    ),
    React.createElement(
      "div",
      { className: classes.content },
      React.createElement(
        Typography,
        {
          className: makeClass(classes.margin, classes.whiteText),
          variant: "h6"
        },
        translateMoviePage("list_reviews_title", props.lang)
      ),
      (state.reviews || []).map(function (review, id) {
        return React.createElement(
          Card,
          { className: classes.card, key: id },
          React.createElement(
            CardContent,
            { className: classes.reviewContentContainer },
            React.createElement(
              "div",
              null,
              React.createElement(CardMedia, {
                className: classes.media,
                image: getLocalImage(AVATAR_URL + "/" + review.user_id)
              })
            ),
            React.createElement(
              "div",
              { className: classes.reviewContent },
              React.createElement(
                Typography,
                {
                  className: makeClass(classes.margin, classes.whiteText, classes.title)
                },
                review.title
              ),
              React.createElement(
                Typography,
                {
                  className: makeClass(classes.margin, classes.greyText)
                },
                review.user.name,
                " - ",
                DateFormatter(review.create_time)
              ),
              React.createElement(Rating, { value: review.grade }),
              React.createElement(
                Typography,
                {
                  className: makeClass(classes.margin, classes.whiteText, classes.multiline)
                },
                review.content.replace("\n")
              )
            )
          )
        );
      })
    )
  );
}