var ratingStyles = makeStyles(function (theme) {
  return {
    flex: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    icon: {
      width: "20px",
      margin: "1px"
    },
    margin: {
      marginLeft: "10px"
    },
    text: {
      color: THEME.palette.primary.main,
      fontWeight: "bold"
    }
  };
});

function Rating(props) {
  var classes = ratingStyles();

  var decimalPart = Math.round((props.value - Math.floor(props.value)) * 2);
  var starsCount = Math.floor(Math.floor(props.value) + decimalPart / 2);

  function getSvg(key, type) {
    var type_url = "";
    if (type === "half") {
      type_url = "half_";
    } else if (type === "empty") {
      type_url = "empty_";
    }
    var url = "resources/Rating/" + type_url + "star.svg";

    return React.createElement("img", { className: classes.icon, src: url, key: key });
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

  function DisplayRating() {
    if (props.count > 0) {
      return React.createElement(
        "div",
        { className: classes.flex },
        React.createElement(
          "div",
          { className: classes.margin },
          stars
        ),
        React.createElement(
          Typography,
          { className: makeClass(classes.margin, classes.text) },
          props.value,
          " (",
          props.count,
          ")"
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