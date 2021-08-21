const itemStyles = makeStyles((theme) => ({
  paper: {
    background: THEME.palette.secondary.background,
    color: THEME.palette.primary.text,
  },
  listItem: {
    padding: theme.spacing(2),
    height: "fit-content",
  },
  img_grid: {
    width: "200px",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "calc(200px - 16px)",
  },
  margin: {
    margin: "10px",
  },
}));

function Item(props) {
  const classes = itemStyles();

  const data = props.data;

  return (
    <Paper className={makeClass(classes.paper, classes.margin)}>
      <ListItem
        button
        component="a"
        href={getMoviePage(data.id)}
        className={classes.listItem}
      >
        <Grid container spacing={2}>
          <Grid item className={classes.img_grid}>
            <img
              className={classes.img}
              alt="Error loading the image"
              src={getImage(SIZE_w500, data.poster_path)}
            />
          </Grid>
          <Grid item xs={12} sm className={classes.grid}>
            <Typography className={classes.margin} variant="h5">
              {data.title} ({getYear(data.release_date)})
            </Typography>
            <Typography className={classes.margin}>
              {data.release_date}
            </Typography>
            <Rating
              className={classes.margin}
              value={data.vote_average}
              count={data.vote_count}
            ></Rating>
            <Typography className={classes.margin}>{data.overview}</Typography>
          </Grid>
        </Grid>
      </ListItem>
    </Paper>
  );
}
