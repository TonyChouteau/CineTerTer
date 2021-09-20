const movieReviewsStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  titlePaper: {
    background: THEME.palette.secondary.background,
    color: THEME.palette.primary.text,
    padding: "5px 0",
  },
  margin: {
    margin: "10px",
  },
  centerText: {
    textAlign: "center",
  },
  whiteText: {
    color: "white",
  },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  card: {
    width: "calc(100% - 20px)",
    display: "flex",
    flexDirection: "column",
    margin: "10px",
    background: "unset",
  },
  reviewContentContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: "16px",
  },
  reviewContent: {
    display: "flex",
    flexDirection: "column",
    width: "calc(100% - 50px)",
    paddingLeft: "10px",
  },
  inputRoot: {
    margin: theme.spacing(1),
    width: "250px",
    "& label": {
      color: THEME.palette.primary.text,
    },
    "& textarea": {
      color: THEME.palette.primary.text,
    },
  },
  fullWidth: {
    width: "100%",
  },
  content: {
    padding: "0 26px",
  },
  media: {
    height: "50px",
    width: "50px",
    borderRadius: "25px",
    backgroundPosition: "top",
  },
  title: {
    fontSize: "18px",
  },
}));

function MovieReviews(props) {
  const classes = movieReviewsStyles();

  const [reviews, setReviews] = React.useState(null);

  if (!reviews) {
    fetch(getReviewsUrl(props.movieId), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setReviews(data.data);
        }
      });
  }

  return (
    <div className={classes.root}>
      <div className={classes.head}>
        <Typography
          className={makeClass(classes.margin, classes.centerText)}
          variant="h5"
        >
          {translateMoviePage("review", props.lang)}
        </Typography>
        <Card
          className={classes.card}
          style={{ border: "none", boxShadow: "none" }}
        >
          <CardContent>
            <Typography
              className={makeClass(classes.margin, classes.whiteText)}
              variant="h6"
            >
              Faites une critique
            </Typography>
            <TextField
              className={makeClass(classes.inputRoot, classes.whiteText)}
              variant="outlined"
              label={translateMoviePage("review_title", props.lang)}
            ></TextField>
            <TextField
              className={makeClass(
                classes.inputRoot,
                classes.fullWidth,
                classes.whiteText
              )}
              variant="outlined"
              label={translateMoviePage("review_comment", props.lang)}
              multiline
            ></TextField>
            <Rating className={classes.margin} value={5} input={true}></Rating>
          </CardContent>
        </Card>
      </div>
      <div className={classes.content}>
        <Typography
          className={makeClass(classes.margin, classes.whiteText)}
          variant="h6"
        >
          Les autres critiques
        </Typography>
        {(reviews || []).map((review, id) => {
          return (
            <Card className={classes.card} key={id}>
              <CardContent className={classes.reviewContentContainer}>
                <div>
                  <CardMedia
                    className={classes.media}
                    image={getLocalImage(AVATAR_URL + "/" + review.user_id)}
                  />
                </div>
                <div className={classes.reviewContent}>
                  <Typography
                    className={makeClass(
                      classes.margin,
                      classes.whiteText,
                      classes.title
                    )}
                  >
                    {review.title}
                  </Typography>
                  <Rating value={review.grade}></Rating>
                  <Typography
                    className={makeClass(classes.margin, classes.whiteText)}
                  >
                    {review.content}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
