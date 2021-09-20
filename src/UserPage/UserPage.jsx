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
  gridImage: {
    maxWidth: "400px",
  },
  gridFlex: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  whiteText: {
    color: THEME.palette.primary.text,
  },
  inputRoot: {
    margin: theme.spacing(1),
    width: "250px",
    "& label": {
      color: THEME.palette.primary.text,
    },
    "& input": {
      color: THEME.palette.primary.text,
    },
  },
  submitButton: {
    width: "200px",
    height: "50px",
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
    borderRadius: "10px",
    overflow: "hidden",
  },
  imageAlt: {
    position: "absolute",
    background: THEME.palette.primary.background,
    width: "100%",
    height: "100%",
    top: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    "&:hover": {
      opacity: 0.7,
    },
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
    objectFit: "cover",
  },
}));

function UserPage(props) {
  const classes = userStyles();
  const user = props.user;

  const [errorChange, setErrorChange] = React.useState(false);
  const [errorNew, setErrorNew] = React.useState(false);

  function avatarChange(event) {
    var input = event.target;

    let file = new FormData();
    file.append("file", input.files[0]);
    fetch(AVATAR_URL, {
      method: "POST",
      body: file,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 201) {
          props.getUser();
        }
      });
  }

  function passwordChange() {
    password = $("input", ".change_user_password").val();
    if (password.length >= 8) {
      setErrorChange(false);
      fetch(USER_URL, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          password: SHA256.hex(password),
          email: "",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 201) {
            props.getUser();
          }
        });
    } else {
      setErrorChange(true);
    }
  }

  function newUser() {
    username = $("input", ".new_user_username").val();
    password = $("input", ".new_user_password").val();
    email = $("input", ".new_user_email").val();
    if (username.length >= 1 && password.length >= 8 && email.length >= 6) {
      setErrorNew(false);
      fetch(USERS_URL, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: SHA256.hex(password),
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 201) {
          }
        });
    } else {
      setErrorNew(true);
    }
  }

  const uploadHtml = (label) => (
    <div className={classes.imageAlt}>
      <Button
        className={classes.imageAltButton}
        variant="contained"
        component="label"
      >
        <Typography>{label}</Typography>
        <input
          type="file"
          className={classes.imageAltButton}
          hidden
          onChange={avatarChange}
        ></input>
      </Button>
    </div>
  );

  let avatar = "";
  if (user.avatar_exists) {
    avatar = (
      <div className={classes.imageContainer}>
        <img
          className={classes.image}
          alt=""
          src={getLocalImage(AVATAR_URL)}
        ></img>
        {uploadHtml("Change your avatar")}
      </div>
    );
  } else {
    avatar = (
      <div className={classes.imageContainer}>
        {uploadHtml("Upload your avatar")}
      </div>
    );
  }

  function makeAdmin() {
    if (user.admin) {
      return (
        <Grid item container className={classes.gridFlex}>
          <Grid item container className={classes.gridFlex}>
            <TextField
              error={errorNew}
              id="username"
              label={translateUserPage("new_username", props.lang)}
              variant="outlined"
              className={makeClass(
                classes.inputRoot,
                classes.whiteText,
                "new_user_username"
              )}
            ></TextField>
            <TextField
              error={errorNew}
              id="password"
              label={translateUserPage("new_password", props.lang)}
              variant="outlined"
              className={makeClass(
                classes.inputRoot,
                classes.whiteText,
                "new_user_password"
              )}
            ></TextField>
            <TextField
              error={errorNew}
              id="email"
              label={translateUserPage("new_email", props.lang)}
              variant="outlined"
              className={makeClass(
                classes.inputRoot,
                classes.whiteText,
                "new_user_email"
              )}
            ></TextField>
          </Grid>
          <Grid item container className={classes.gridFlex}>
            <Button
              id="login"
              variant="contained"
              color="primary"
              className={makeClass(
                classes.inputRoot,
                classes.whiteText,
                classes.submitButton
              )}
              onClick={newUser}
            >
              {translateUserPage("create", props.lang)}
            </Button>
          </Grid>
        </Grid>
      );
    } else {
      return "";
    }
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
          <Grid item xs={6} className={classes.grid}>
            <Grid item container className={classes.gridFlex}>
              <Grid item container className={classes.gridFlex}>
                {/* <TextField
                  id="username"
                  label={translateUserPage("change_username", props.lang)}
                  autoComplete="username"
                  variant="outlined"
                  className={makeClass(classes.inputRoot, classes.whiteText)}
                ></TextField> */}
                <TextField
                  error={errorChange}
                  id="password"
                  label={translateUserPage("change_password", props.lang)}
                  autoComplete="current-password"
                  variant="outlined"
                  className={makeClass(
                    classes.inputRoot,
                    classes.whiteText,
                    "change_user_password"
                  )}
                ></TextField>
              </Grid>
              <Grid item container className={classes.gridFlex}>
                <Button
                  id="login"
                  variant="contained"
                  color="primary"
                  className={makeClass(
                    classes.inputRoot,
                    classes.whiteText,
                    classes.submitButton
                  )}
                  onClick={passwordChange}
                >
                  {translateUserPage("save", props.lang)}
                </Button>
              </Grid>
            </Grid>
            {makeAdmin()}
          </Grid>
          <Grid
            item
            xs={6}
            className={makeClass(classes.grid, classes.gridImage)}
          >
            {avatar}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
