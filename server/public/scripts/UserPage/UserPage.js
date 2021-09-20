var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var userStyles = makeStyles(function (theme) {
  return {
    root: {
      minHeight: "calc(100vh - " + THEME.size.appBar + " - " + THEME.size.footer + ")"
    },
    paper: {
      margin: "10px",
      padding: theme.spacing(2),
      background: THEME.palette.secondary.background
    },
    grid: {
      padding: theme.spacing(1)
    },
    gridImage: {
      maxWidth: "400px"
    },
    gridFlex: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    whiteText: {
      color: THEME.palette.primary.text
    },
    inputRoot: {
      margin: theme.spacing(1),
      width: "250px",
      "& label": {
        color: THEME.palette.primary.text
      },
      "& input": {
        color: THEME.palette.primary.text
      }
    },
    submitButton: {
      width: "200px",
      height: "50px"
    },
    textAlign: {
      textAlign: "center"
    },
    flex: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
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
      overflow: "hidden"
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
        opacity: 0.7
      }
    },
    imageAltButton: {
      background: THEME.palette.primary.main,
      color: THEME.palette.primary.text,
      "&:hover": {
        background: THEME.palette.secondary.main
      }
    },
    image: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      objectFit: "cover"
    }
  };
});

function UserPage(props) {
  var classes = userStyles();
  var user = props.user;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      errorChange = _React$useState2[0],
      setErrorChange = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      errorNew = _React$useState4[0],
      setErrorNew = _React$useState4[1];

  function avatarChange(event) {
    var input = event.target;

    var file = new FormData();
    file.append("file", input.files[0]);
    fetch(AVATAR_URL, {
      method: "POST",
      body: file
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.status === 201) {
        props.getUser();
      }
    });
  }

  function passwordChange() {
    password = $("input", ".change_user_password").val();
    console.log(password.length);
    if (password.length >= 8) {
      setErrorChange(false);
      fetch(USER_URL, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify({
          password: SHA256.hex(password),
          email: ""
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
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
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: SHA256.hex(password),
          email: email
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 201) {
          console.log(data);
        }
      });
    } else {
      setErrorNew(true);
    }
  }

  var uploadHtml = function uploadHtml(label) {
    return React.createElement(
      "div",
      { className: classes.imageAlt },
      React.createElement(
        Button,
        {
          className: classes.imageAltButton,
          variant: "contained",
          component: "label"
        },
        React.createElement(
          Typography,
          null,
          label
        ),
        React.createElement("input", {
          type: "file",
          className: classes.imageAltButton,
          hidden: true,
          onChange: avatarChange
        })
      )
    );
  };

  var avatar = "";
  if (user.avatar_exists) {
    avatar = React.createElement(
      "div",
      { className: classes.imageContainer },
      React.createElement("img", {
        className: classes.image,
        alt: "",
        src: getLocalImage(AVATAR_URL)
      }),
      uploadHtml("Change your avatar")
    );
  } else {
    avatar = React.createElement(
      "div",
      { className: classes.imageContainer },
      uploadHtml("Upload your avatar")
    );
  }

  function makeAdmin() {
    if (user.admin) {
      return React.createElement(
        Grid,
        { item: true, container: true, className: classes.gridFlex },
        React.createElement(
          Grid,
          { item: true, container: true, className: classes.gridFlex },
          React.createElement(TextField, {
            error: errorNew,
            id: "username",
            label: translateUserPage("new_username", props.lang),
            variant: "outlined",
            className: makeClass(classes.inputRoot, classes.whiteText, "new_user_username")
          }),
          React.createElement(TextField, {
            error: errorNew,
            id: "password",
            label: translateUserPage("new_password", props.lang),
            variant: "outlined",
            className: makeClass(classes.inputRoot, classes.whiteText, "new_user_password")
          }),
          React.createElement(TextField, {
            error: errorNew,
            id: "email",
            label: translateUserPage("new_email", props.lang),
            variant: "outlined",
            className: makeClass(classes.inputRoot, classes.whiteText, "new_user_email")
          })
        ),
        React.createElement(
          Grid,
          { item: true, container: true, className: classes.gridFlex },
          React.createElement(
            Button,
            {
              id: "login",
              variant: "contained",
              color: "primary",
              className: makeClass(classes.inputRoot, classes.whiteText, classes.submitButton),
              onClick: newUser
            },
            translateUserPage("create", props.lang)
          )
        )
      );
    } else {
      return "";
    }
  }

  return React.createElement(
    "div",
    { className: classes.root },
    React.createElement(
      Paper,
      { className: classes.paper },
      React.createElement(
        Grid,
        { container: true, className: classes.flex },
        React.createElement(
          Grid,
          { item: true, xs: 12, className: classes.grid },
          React.createElement(
            Typography,
            {
              className: makeClass(classes.whiteText, classes.textAlign),
              variant: "h5"
            },
            "Welcome ",
            user.name
          )
        ),
        React.createElement(
          Grid,
          { item: true, xs: 6, className: classes.grid },
          React.createElement(
            Grid,
            { item: true, container: true, className: classes.gridFlex },
            React.createElement(
              Grid,
              { item: true, container: true, className: classes.gridFlex },
              React.createElement(TextField, {
                error: errorChange,
                id: "password",
                label: translateUserPage("change_password", props.lang),
                autoComplete: "current-password",
                variant: "outlined",
                className: makeClass(classes.inputRoot, classes.whiteText, "change_user_password")
              })
            ),
            React.createElement(
              Grid,
              { item: true, container: true, className: classes.gridFlex },
              React.createElement(
                Button,
                {
                  id: "login",
                  variant: "contained",
                  color: "primary",
                  className: makeClass(classes.inputRoot, classes.whiteText, classes.submitButton),
                  onClick: passwordChange
                },
                translateUserPage("save", props.lang)
              )
            )
          ),
          makeAdmin()
        ),
        React.createElement(
          Grid,
          {
            item: true,
            xs: 6,
            className: makeClass(classes.grid, classes.gridImage)
          },
          avatar
        )
      )
    )
  );
}