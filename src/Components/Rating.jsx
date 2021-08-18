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
  }
}));

function Rating(props) {
  const classes = ratingStyles();

  let decimalPart = Math.round((props.value - Math.floor(props.value)) * 2);
  const starsCount = Math.floor(Math.floor(props.value) + decimalPart / 2);

  function getSvg(key, type) {
    let type_url = "";
    if (type === "half") {
      type_url = "half_";
    } else if (type === "empty") {
      type_url = "empty_";
    }
    const url = `resources/Rating/${type_url}star.svg`;

    return <img className={classes.icon} src={url} key={key}></img>;
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

  console.log(stars);

  return (
    <div className={classes.flex}>
      <div className={classes.margin}>{stars}</div>
      <Typography className={classes.margin}>{props.value}</Typography>
    </div>
  );
}
