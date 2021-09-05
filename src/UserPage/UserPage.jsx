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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageAlt: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageAltButton: {
    background: THEME.palette.primary.main,
    color: THEME.palette.primary.text,
    "&:hover": {
      background: THEME.palette.secondary.main,
    },
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
  },
}));

function UserPage(props) {
  const classes = userStyles();
  const user = props.user;

  function avatarChange(event) {
    var input = event.target;

    let file = new FormData();
    file.append('file', input.files[0])
    fetch(AVATAR_URL, {
      method: "POST",
      body: file
    }).then(response => response.json()).then(data => {
      console.log(data);
    });
  }

  let avatar = "";
  if (user.avatar_exists) {
    avatar = (
      <img
        className={classes.image}
        alt=""
        src={getLocalImage(AVATAR_URL)}
      ></img>
    );
  } else {
    avatar = (
      <div className={classes.imageAlt}>
        <Button
          className={classes.imageAltButton}
          variant="contained"
          component="label"
        >
          <Typography>Upload your avatar</Typography>
          <input
            type="file"
            className={classes.imageAltButton}
            hidden
            onChange={avatarChange}
          ></input>
        </Button>
      </div>
    );
  }

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
            <div className={classes.imageContainer}>{avatar}</div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
