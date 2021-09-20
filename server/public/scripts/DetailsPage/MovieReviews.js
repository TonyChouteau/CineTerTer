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
    inputRoot: {
      margin: theme.spacing(1),
      width: "250px",
      "& label": {
        color: THEME.palette.primary.text
      },
      "& textarea": {
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
    }
  };
});

function MovieReviews(props) {
  var classes = movieReviewsStyles();

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      reviews = _React$useState2[0],
      setReviews = _React$useState2[1];

  if (!reviews) {
    fetch(getReviewsUrl(props.movieId), {
      method: "GET"
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.status === 200) {
        setReviews(data.data);
      }
    });
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
          null,
          React.createElement(
            Typography,
            {
              className: makeClass(classes.margin, classes.whiteText),
              variant: "h6"
            },
            "Faites une critique"
          ),
          React.createElement(TextField, {
            className: makeClass(classes.inputRoot, classes.whiteText),
            variant: "outlined",
            label: translateMoviePage("review_title", props.lang)
          }),
          React.createElement(TextField, {
            className: makeClass(classes.inputRoot, classes.fullWidth, classes.whiteText),
            variant: "outlined",
            label: translateMoviePage("review_comment", props.lang),
            multiline: true
          }),
          React.createElement(Rating, { className: classes.margin, value: 5, input: true })
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
        "Les autres critiques"
      ),
      (reviews || []).map(function (review, id) {
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
              React.createElement(Rating, { value: review.grade }),
              React.createElement(
                Typography,
                {
                  className: makeClass(classes.margin, classes.whiteText)
                },
                review.content
              )
            )
          )
        );
      })
    )
  );
}