const loginStyles = makeStyles((theme) => ({
  root: {
    minHeight: `calc(100vh - ${THEME.size.appBar} - ${THEME.size.footer})`,
  },
  fullHeight: {
    minHeight: `calc(100vh - ${THEME.size.footer})`,
  },
  cardContainer: {
    padding: theme.spacing(5),
    background: THEME.palette.secondary.background,
  },
  flex: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: theme.spacing(3),
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
  whiteText: {
    color: THEME.palette.primary.text,
  },
  submitButton: {
    width: "200px",
    height: "50px",
    marginTop: "27px",
  },
  error: {
    color: "red",
  },
}));

function LoginPage(props) {
  const classes = loginStyles();

  function onKeyPress(event) {
    let $node = $(event.target);

    if (event.key === "Enter") {
      if ($node.attr("id") === "username") {
        $("#password").focus();
      } else if ($node.attr("id") === "password") {
        onSubmit();
      }
    }
  }

  function onSubmit() {
    const logInfo = {
      username: $("#username").val(),
      password: SHA256.hex($("#password").val()),
    };
    if (logInfo.username !== "" && logInfo.password !== emptyStringHash) {
      fetch(getLoginUrl(), {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(logInfo),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 401) {
            logInfo["error"] = true;
          } else if (data.status === 200) {
            logInfo["logged"] = true;
            logInfo["error"] = false;
          }
          props.setLogInfo(logInfo);
          //props.setLogged(data.status === 200);
        });
    } else {
      props.setLogInfo(logInfo);
    }
  }

  function onSignout() {
    fetch(getLoginUrl(), {
      method: "DELETE",
    }).then(() => {
      const logInfo = {
        username: "-",
        password: "",
        error: false,
        logged: false,
        logging: true,
      };
      props.setLogInfo(logInfo);
    });
  }

  if (props.logInfo.logged) {
    return (
      <div className={makeClass(classes.root, classes.flex)}>
        <Card className={makeClass(classes.cardContainer, classes.flex)}>
          <Typography
            variant="h5"
            className={makeClass(classes.whiteText, classes.title)}
          >
            {translateLogin("signout", props.lang).toUpperCase()}
          </Typography>
          <Button
            id="login"
            variant="contained"
            color="primary"
            className={makeClass(
              classes.inputRoot,
              classes.whiteText,
              classes.submitButton
            )}
            onClick={onSignout}
          >
            {translateLogin("signout", props.lang)}
          </Button>
        </Card>
        <Version></Version>
      </div>
    );
  } else {
    return (
      <div
        className={makeClass(
          classes.root,
          classes.flex,
          props.logInfo.logged ? "" : classes.fullHeight
        )}
      >
        <Typography
          variant="h3"
          className={makeClass(classes.whiteText, classes.title)}
        >
          CineTerTer
        </Typography>
        <Card className={makeClass(classes.cardContainer, classes.flex)}>
          <Typography
            variant="h5"
            className={makeClass(classes.whiteText, classes.title)}
          >
            {translateLogin("login", props.lang).toUpperCase()}
          </Typography>
          <TextField
            error={props.logInfo.username === ""}
            id="username"
            label={translateLogin("username", props.lang)}
            autoComplete="username"
            variant="outlined"
            className={makeClass(classes.inputRoot, classes.whiteText)}
            onKeyPress={onKeyPress}
          />
          <TextField
            error={props.logInfo.password === emptyStringHash}
            id="password"
            label={translateLogin("password", props.lang)}
            type="password"
            autoComplete="current-password"
            variant="outlined"
            className={makeClass(classes.inputRoot, classes.whiteText)}
            onKeyPress={onKeyPress}
          />
          <Error error={props.logInfo.error}>
            The username or the password is incorrect
          </Error>
          <Button
            id="login"
            variant="contained"
            color="primary"
            className={makeClass(
              classes.inputRoot,
              classes.whiteText,
              classes.submitButton
            )}
            onClick={onSubmit}
          >
            {translateLogin("login", props.lang)}
          </Button>
        </Card>
        <Version></Version>
      </div>
    );
  }
}
