const userStyles = makeStyles((theme) => ({
  root: {
    minHeight: `calc(100vh - ${THEME.size.appBar} - ${THEME.size.footer})`,
  },
  paper: {
    margin: "10px",
    padding: theme.spacing(2),
    background: THEME.palette.secondary.background,
  },
  grid: {
    padding: theme.spacing(1),
  },
  whiteText: {
    color: THEME.palette.primary.text,
  },
  textAlign: {
    textAlign: "center",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: "0",
    paddingBottom: "100%",
    background: THEME.palette.primary.background,
    position: "relative",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
}));

function UserPage(props) {
  const classes = userStyles();
  const user = props.user;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container className={classes.flex}>
          <Grid item xs={12} className={classes.grid}>
            <Typography
              className={makeClass(classes.whiteText, classes.textAlign)}
              variant="h5"
            >
              Welcome {user.name}
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.grid}></Grid>
          <Grid
            item
            xs={6}
            className={makeClass(classes.grid, classes.gridImage)}
          >
            <div className={classes.imageContainer}>
              <img className={classes.image} src={getImage(true)}></img>
              <img
                className={classes.image}
                src={getLocalImage(
                  AVATAR_URL,
                  props.user ? props.user.id : "",
                  ".png"
                )}
                alt=""
              ></img>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
