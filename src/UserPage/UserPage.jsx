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
  //errorChange
  const [changeState, setChangeState] = React.useState({
    error: null,
    errorMessage: null,
    success: null,
  });
  //errorNew
  const [newState, setNewState] = React.useState({
    error: null,
    errorMessage: null,
    success: null,
  });

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
          if (data.status === 200) {
            props.getUser();
            setChangeState({ ...changeState, success: true, error: false });
            $("input", ".change_password").val("");
          } else {
            setChangeState({
              ...changeState,
              error: true,
              errorMessage: data.error || translateAll("error", props.lang),
            });
          }
        });
    } else {
      setChangeState({
        ...changeState,
        error: true,
        errorMessage: translateAll("at_least_8", props.lang),
      });
    }
  }

  function newUser() {
    username = $("input", ".new_user_username").val();
    password = $("input", ".new_user_password").val();
    email = $("input", ".new_user_email").val();
    if (username.length >= 1 && password.length >= 8 && email.length >= 6) {
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
            setNewState({...newState, error: null, errorMessage: null, success: true});
          } else {
            setNewState({...newState, error: true, errorMessage: data.error || translateAll("error", props.lang), success: false});
          }
        });
    } else {
      setNewState({...newState, error: true, errorMessage: translateAll("at_least_8", props.lang), success: false});
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

  console.log(user);

  function MakeAdmin() {
    if (user.admin) {
      return (
        <Grid item container className={classes.gridFlex}>
          <Grid item container className={classes.gridFlex}>
            <TextField
              error={newState.error}
              id="username"
              label={translateUserPage("new_username", props.lang)}
              variant="outlined"
              className={makeClass(
                classes.inputRoot,
                classes.whiteText,
                "new_user_username"
              )}
              autoComplete="off"
            ></TextField>
            <TextField
              error={newState.error}
              id="password"
              label={translateUserPage("new_password", props.lang)}
              variant="outlined"
              className={makeClass(
                classes.inputRoot,
                classes.whiteText,
                "new_user_password"
              )}
              type="password"
              autoComplete="off"
            ></TextField>
            <TextField
              error={newState.error}
              id="email"
              label={translateUserPage("new_email", props.lang)}
              variant="outlined"
              className={makeClass(
                classes.inputRoot,
                classes.whiteText,
                "new_user_email"
              )}
              autoComplete="off"
            ></TextField>
            <Error error={newState.error}>{newState.errorMessage}</Error>
            <Success success={newState.success}>
              {translateUserPage("success", props.lang)}
            </Success>
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
  console.log(changeState)

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
                  error={changeState.error}
                  id="password"
                  label={translateUserPage("change_password", props.lang)}
                  variant="outlined"
                  type="password"
                  className={makeClass(
                    classes.inputRoot,
                    classes.whiteText,
                    "change_user_password"
                  )}
                  autoComplete='new-password'
                ></TextField>
                <Error error={changeState.error}>{changeState.errorMessage}</Error>
                <Success success={changeState.success}>
                  {translateUserPage("success", props.lang)}
                </Success>
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
            <MakeAdmin></MakeAdmin>
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
