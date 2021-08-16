var useStyles = makeStyles(function (theme) {
  return {
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  };
});

function Menu() {
  var classes = useStyles();

  return React.createElement(
    "div",
    { className: classes.root },
    React.createElement(
      AppBar,
      { position: "static" },
      React.createElement(
        Toolbar,
        null,
        React.createElement(
          IconButton,
          {
            edge: "start",
            className: classes.menuButton,
            color: "inherit",
            "aria-label": "menu"
          },
          React.createElement(MenuIcon, null)
        ),
        React.createElement(
          Typography,
          { variant: "h6", className: classes.title },
          "News"
        ),
        React.createElement(
          Button,
          { color: "inherit" },
          "Login"
        )
      )
    )
  );
}