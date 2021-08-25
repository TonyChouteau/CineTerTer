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
  titlePaper: {
    background: THEME.palette.secondary.background,
    color: THEME.palette.primary.text,
    padding: "5px 0",
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
  paperList: {
    margin: "10px",
    width: "calc(100% - 20px)",
  },
  centerText: {
    textAlign: "center",
  },
}));

function MoviePage(props) {
  const classes = movieStyles();

  const [_data, setData] = React.useState({});

  let id = getParam(MOVIE_PAGE_URL, "id");

  if (JSON.stringify(_data) === "{}") {
    fetch(getApiMovie(id, props.lang))
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        g_lastMovieData = data;
      });
  }

  // Prevent the display from reloading during a search (fucking disgusting but it works)
  let data = JSON.stringify(_data) !== "{}" ? _data : g_lastMovieData || {};

  let crew = [];
  let cast = [];
  if (data.credits) {
    cast = data.credits.cast.sortBy("popularity");

    const credits = {};
    for (let i in data.credits.crew) {
      const credit = data.credits.crew[i];
      const job = credit.job;
      if (credits[credit.name]) {
        credits[credit.name].job.push(job);
      } else {
        credits[credit.name] = credit;
        credits[credit.name].job = [job];
      }
    }
    crew = Object.values(credits).sortBy("popularity");
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            {data.poster_path ? (
              <img
                className={classes.img}
                alt="Error loading the image"
                src={getImage(SIZE_w500, data.poster_path)}
              />
            ) : (
              <CircularProgress></CircularProgress>
            )}
          </Grid>
          <Grid item container xs={12} sm>
            <Grid item>
              <Grid
                className={makeClass(classes.rightMargin, classes.row)}
                item
                xs={12}
                sm
              >
                <Typography className={classes.margin} variant="h5">
                  {data.title} ({getYear(data.release_date)})
                </Typography>
                <Typography
                  className={makeClass(classes.margin, classes.greyText)}
                  variant="h5"
                >
                  {getCollection(data.belongs_to_collection)}
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
                  {data.release_date}
                </Typography>
                <Typography
                  className={makeClass(classes.rightMargin, classes.greyText)}
                >
                  {getDuration(data.runtime)}
                </Typography>
                <Typography
                  className={makeClass(classes.rightMargin, classes.greyText)}
                >
                  {getGenre(data.genres)}
                </Typography>
              </Grid>
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
                  {translateMoviePage("status", props.lang)}{" "}
                  {translateMoviePage(data.status, props.lang)}
                </Typography>
                <Typography className={classes.greyText}>
                  {translateMoviePage("lang", props.lang)}{" "}
                  {getLanguage(data.original_language).name} (
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
                  {translateMoviePage("budget", props.lang)}{" "}
                  {getMoney(data.budget)}
                </Typography>
                <Typography className={classes.greyText}>
                  {translateMoviePage("revenue", props.lang)}{" "}
                  {getMoney(data.revenue)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <div className={classes.paperList}>
        <Paper className={classes.titlePaper}>
          <Typography
            className={makeClass(classes.margin, classes.centerText)}
            variant="h5"
          >
            Crew
          </Typography>
          <ScrollableCardList
            image={(item) => getImage(SIZE_w500, item.profile_path)}
            title={(item) => item.name}
            content={(item) => item.job.join(" - ")}
            data={crew}
          ></ScrollableCardList>
        </Paper>
      </div>
      <div className={classes.paperList}>
        <Paper className={classes.titlePaper}>
          <Typography
            className={makeClass(classes.margin, classes.centerText)}
            variant="h5"
          >
            Cast
          </Typography>
          <ScrollableCardList
            image={(item) => getImage(SIZE_w500, item.profile_path)}
            title={(item) => item.name}
            content={(item) => item.character}
            data={cast}
          ></ScrollableCardList>
        </Paper>
      </div>
    </div>
  );
}
