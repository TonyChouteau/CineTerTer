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
    whiteText: {
      color: THEME.palette.primary.text
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
      justifyContent: "center"
    },
    imageAlt: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
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
      top: "0"
    }
  };
});

function UserPage(props) {
  var classes = userStyles();
  var user = props.user;

  function avatarChange(event) {
    var input = event.target;

    var file = new FormData();
    file.append('file', input.files[0]);
    fetch(AVATAR_URL, {
      method: "POST",
      body: file
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
    });
  }

  var avatar = "";
  if (user.avatar_exists) {
    avatar = React.createElement("img", {
      className: classes.image,
      alt: "",
      src: getLocalImage(AVATAR_URL)
    });
  } else {
    avatar = React.createElement(
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
          "Upload your avatar"
        ),
        React.createElement("input", {
          type: "file",
          className: classes.imageAltButton,
          hidden: true,
          onChange: avatarChange
        })
      )
    );
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
        React.createElement(Grid, { item: true, xs: 6, className: classes.grid }),
        React.createElement(
          Grid,
          {
            item: true,
            xs: 6,
            className: makeClass(classes.grid, classes.gridImage)
          },
          React.createElement(
            "div",
            { className: classes.imageContainer },
            avatar
          )
        )
      )
    )
  );
}