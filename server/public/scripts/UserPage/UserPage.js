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
  //errorChange

  var _React$useState = React.useState({
    error: null,
    errorMessage: null,
    success: null
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      changeState = _React$useState2[0],
      setChangeState = _React$useState2[1];
  //errorNew


  var _React$useState3 = React.useState({
    error: null,
    errorMessage: null,
    success: null
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      newState = _React$useState4[0],
      setNewState = _React$useState4[1];

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
    if (password.length >= 8) {
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
        if (data.status === 200) {
          props.getUser();
          setChangeState(Object.assign({}, changeState, { success: true, error: false }));
          $("input", ".change_password").val("");
        } else {
          setChangeState(Object.assign({}, changeState, {
            error: true,
            errorMessage: data.error || translateAll("error", props.lang)
          }));
        }
      });
    } else {
      setChangeState(Object.assign({}, changeState, {
        error: true,
        errorMessage: translateAll("at_least_8", props.lang)
      }));
    }
  }

  function newUser() {
    username = $("input", ".new_user_username").val();
    password = $("input", ".new_user_password").val();
    email = $("input", ".new_user_email").val();
    if (username.length >= 1 && password.length >= 8 && email.length >= 6) {
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
          setNewState(Object.assign({}, newState, { error: null, errorMessage: null, success: true }));
        } else {
          setNewState(Object.assign({}, newState, { error: true, errorMessage: data.error || translateAll("error", props.lang), success: false }));
        }
      });
    } else {
      setNewState(Object.assign({}, newState, { error: true, errorMessage: translateAll("at_least_8", props.lang), success: false }));
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

  console.log(user);

  function MakeAdmin() {
    if (user.admin) {
      return React.createElement(
        Grid,
        { item: true, container: true, className: classes.gridFlex },
        React.createElement(
          Grid,
          { item: true, container: true, className: classes.gridFlex },
          React.createElement(TextField, {
            error: newState.error,
            id: "username",
            label: translateUserPage("new_username", props.lang),
            variant: "outlined",
            className: makeClass(classes.inputRoot, classes.whiteText, "new_user_username"),
            autoComplete: "off"
          }),
          React.createElement(TextField, {
            error: newState.error,
            id: "password",
            label: translateUserPage("new_password", props.lang),
            variant: "outlined",
            className: makeClass(classes.inputRoot, classes.whiteText, "new_user_password"),
            type: "password",
            autoComplete: "off"
          }),
          React.createElement(TextField, {
            error: newState.error,
            id: "email",
            label: translateUserPage("new_email", props.lang),
            variant: "outlined",
            className: makeClass(classes.inputRoot, classes.whiteText, "new_user_email"),
            autoComplete: "off"
          }),
          React.createElement(
            Error,
            { error: newState.error },
            newState.errorMessage
          ),
          React.createElement(
            Success,
            { success: newState.success },
            translateUserPage("success", props.lang)
          )
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
  console.log(changeState);

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
                error: changeState.error,
                id: "password",
                label: translateUserPage("change_password", props.lang),
                variant: "outlined",
                type: "password",
                className: makeClass(classes.inputRoot, classes.whiteText, "change_user_password"),
                autoComplete: "new-password"
              }),
              React.createElement(
                Error,
                { error: changeState.error },
                changeState.errorMessage
              ),
              React.createElement(
                Success,
                { success: changeState.success },
                translateUserPage("success", props.lang)
              )
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
          React.createElement(MakeAdmin, null)
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