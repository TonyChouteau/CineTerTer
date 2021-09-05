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
      position: "relative"
    },
    image: {
      position: "absolute",
      width: "100%",
      height: "100%"
    }
  };
});

function UserPage(props) {
  var classes = userStyles();
  var user = props.user;

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
            React.createElement("img", { className: classes.image, src: getImage(true) }),
            React.createElement("img", {
              className: classes.image,
              src: getLocalImage(AVATAR_URL, props.user ? props.user.id : "", ".png"),
              alt: ""
            })
          )
        )
      )
    )
  );
}