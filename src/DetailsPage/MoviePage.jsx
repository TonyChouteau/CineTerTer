const movieStyles = makeStyles((theme) => ({
  root: {
    minHeight: `calc(100vh - ${THEME.size.appBar} - ${THEME.size.footer})`,
  },
  paper: {
    background: THEME.palette.secondary.background,
    padding: theme.spacing(2),
    margin: "10px",
    color: THEME.palette.primary.text,
  },
  img: {
    width: "200px",
  },
  margin: {
    margin: "10px",
  },
  rightMargin: {
    marginRight: "20px",
  },
  greyText: {
    color: THEME.palette.secondary.text,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
}));

function MoviePage(props) {
  const classes = movieStyles();

  const [data, setData] = React.useState({});

  let id = getParam(MOVIE_URL, "id");

  if (JSON.stringify(data) === "{}") {
    fetch(getApiMovie(id))
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <img
              className={classes.img}
              alt="Error loading the image"
              src={getImage(SIZE_w500, data.poster_path)}
            />
          </Grid>
          <Grid item container xs={12} sm>
            <Grid item>
              <Typography className={classes.margin} variant="h5">
                {data.title} ({getYear(data.release_date)})
              </Typography>
              <Typography
                className={makeClass(classes.margin, classes.greyText)}
              >
                {data.release_date}
              </Typography>
              <Rating
                className={classes.margin}
                value={data.vote_average}
                count={data.vote_count}
              ></Rating>
              <Typography className={classes.margin}>
                {data.overview}
              </Typography>
              <Grid
                className={makeClass(classes.margin, classes.row)}
                item
                xs={12}
                sm
              >
                <Typography
                  className={makeClass(classes.rightMargin, classes.greyText)}
                >
                  Duration : {getDuration(data.runtime)}
                </Typography>
                <Typography
                  className={makeClass(classes.rightMargin, classes.greyText)}
                >
                  Status : {data.status}
                </Typography>
                <Typography className={classes.greyText}>
                  Language : {getLanguage(data.original_language).name} (
                  {getLanguage(data.original_language).nativeName})
                </Typography>
              </Grid>
              <Grid
                className={makeClass(classes.margin, classes.row)}
                item
                xs={12}
                sm
              >
                <Typography
                  className={makeClass(classes.rightMargin, classes.greyText)}
                >
                  Budget : {getRevenue(data.budget)}
                </Typography>
                <Typography className={classes.greyText}>
                  Revenue : {getRevenue(data.revenue)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
