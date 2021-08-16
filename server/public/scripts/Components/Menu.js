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
    },
    active: {
      color: "#BBB"
    },
    list: {
      display: "flex"
    },
    link: {
      textDecoration: "none",
      color: "white"
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
          React.createElement(
            "span",
            { className: "material-icons" },
            "menu"
          )
        ),
        React.createElement(
          List,
          { className: classes.list },
          React.createElement(
            ListItem,
            null,
            React.createElement(
              RLink,
              { to: "/", className: classes.link },
              React.createElement(
                Typography,
                {
                  variant: "h6",
                  className: classes.title + " " + classes.active
                },
                "Home"
              )
            )
          ),
          React.createElement(
            ListItem,
            null,
            React.createElement(
              RLink,
              { to: "Info", className: classes.link },
              React.createElement(
                Typography,
                { variant: "h6", className: classes.title },
                "Stats"
              )
            )
          )
        )
      )
    )
  );
}