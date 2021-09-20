var _slicedToArray = (function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    }
  };
})();

var ratingStyles = makeStyles(function (theme) {
  return {
    flex: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      width: "20px",
      margin: "1px",
    },
    margin: {
      marginLeft: "10px",
    },
    text: {
      color: THEME.palette.primary.main,
      fontWeight: "bold",
    },
    startHover: {
      "&:hover": {
        "-webkit-filter": "brightness(50%)",
      },
    },
  };
});

function Rating(props) {
  var classes = ratingStyles();

  var _React$useState = React.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    value = _React$useState2[0],
    setValue = _React$useState2[1];

  var reviewValue = props.input ? value : props.value;

  var decimalPart = Math.round((reviewValue - Math.floor(reviewValue)) * 2);
  var starsCount = Math.floor(Math.floor(reviewValue) + decimalPart / 2);

  function onClick(event) {
    if (props.input) {
      var rect = $(event.target)
        .closest(".review_container")
        .get(0)
        .getBoundingClientRect();
      var x = event.clientX - rect.left;
      var review = Math.round((x / rect.width) * 10 * 2) / 2;
      setValue(review);
      if (props.changeReview) {
        props.changeReview(review);
      }
    }
  }

  function getSvg(key, type) {
    var type_url = "";
    if (type === "half") {
      type_url = "half_";
    } else if (type === "empty") {
      type_url = "empty_";
    }
    var url = "resources/Rating/" + type_url + "star.svg";

    return React.createElement("img", {
      className: makeClass(classes.icon, props.input ? classes.startHover : ""),
      src: url,
      key: key,
    });
  }

  var stars = [];
  for (var i = 0; i < 10; i++) {
    if (i < starsCount) {
      stars.push(getSvg(i));
    } else if (decimalPart === 1) {
      stars.push(getSvg(i, "half"));
      decimalPart = -1;
    } else {
      stars.push(getSvg(i, "empty"));
    }
  }

  function makeViewCount() {
    if (props.input === 0) {
      return "(" + props.count + ")";
    } else {
      return "";
    }
  }

  function DisplayRating() {
    if (props.count > 0 || props.count === undefined || props.input) {
      return React.createElement(
        "div",
        { className: makeClass(classes.flex, props.className || "") },
        React.createElement(
          "div",
          {
            className: makeClass(classes.margin, "review_container"),
            onClick: onClick,
          },
          stars
        ),
        React.createElement(
          Typography,
          { className: makeClass(classes.margin, classes.text) },
          reviewValue,
          makeViewCount()
        )
      );
    } else {
      return React.createElement(
        "div",
        null,
        React.createElement(
          Typography,
          { className: classes.margin },
          "No review"
        )
      );
    }
  }

  return React.createElement(DisplayRating, null);
}
