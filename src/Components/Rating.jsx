const ratingStyles = makeStyles((theme) => ({
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
}));

function Rating(props) {
  const classes = ratingStyles();

  const [value, setValue] = React.useState(0);

  let reviewValue = props.input ? value : props.value;

  let decimalPart = Math.round((reviewValue - Math.floor(reviewValue)) * 2);
  const starsCount = Math.floor(Math.floor(reviewValue) + decimalPart / 2);

  function onClick(event) {
    if (props.input) {
      let rect = $(event.target)
        .closest(".review_container")
        .get(0)
        .getBoundingClientRect();
      let x = event.clientX - rect.left;
      let review = Math.round((x / rect.width) * 10 * 2) / 2;
      setValue(review);
      if (props.changeReview) {
        props.changeReview(review);
      }
    }
  }

  function getSvg(key, type) {
    let type_url = "";
    if (type === "half") {
      type_url = "half_";
    } else if (type === "empty") {
      type_url = "empty_";
    }
    const url = `resources/Rating/${type_url}star.svg`;

    return (
      <img
        className={makeClass(
          classes.icon,
          props.input ? classes.startHover : ""
        )}
        src={url}
        key={key}
      ></img>
    );
  }

  let stars = [];
  for (let i = 0; i < 10; i++) {
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
      return (
        <div className={makeClass(classes.flex, props.className || "")}>
          <div
            className={makeClass(classes.margin, "review_container")}
            onClick={onClick}
          >
            {stars}
          </div>
          <Typography className={makeClass(classes.margin, classes.text)}>
            {reviewValue}
            {makeViewCount()}
          </Typography>
        </div>
      );
    } else {
      return (
        <div>
          <Typography className={classes.margin}>No review</Typography>
        </div>
      );
    }
  }

  return <DisplayRating></DisplayRating>;
}
