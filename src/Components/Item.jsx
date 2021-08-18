const itemStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    height: "fit-content",
    background: THEME.palette.secondary.background,
    color: THEME.palette.primary.text,
  },
  img_grid: {
    width: "200px",
    minHeight: "300px",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "200px",
  },
  margin: {
    margin: "10px",
  },
}));

function Item(props) {
  const classes = itemStyles();

  const data = props.data;

  return (
    <Paper className={classes.paper + " " + classes.margin}>
      <Grid container spacing={2}>
        <Grid item className={classes.img_grid}>
          <img
            className={classes.img}
            alt="complex"
            src={IMG_URL + SIZE_w500 + data.poster_path}
          />
        </Grid>
        <Grid item xs={12} sm className={classes.grid}>
          <Typography className={classes.margin} variant="h5">
            {data.title}
          </Typography>
          <Typography className={classes.margin}>
            {data.release_date}
          </Typography>
          <Rating className={classes.margin} value={data.vote_average}></Rating>
          <Typography className={classes.margin}>{data.overview}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
