function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    },
    search: _defineProperty({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: "#ffffff22",
      '&:hover': {
        backgroundColor: "#ffffff33"
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%'
    }, theme.breakpoints.up('sm'), {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }),
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: _defineProperty({
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: "calc(1em + " + theme.spacing(4) + "px)",
      transition: theme.transitions.create('width'),
      width: '100%'
    }, theme.breakpoints.up('md'), {
      width: '20ch'
    })
  };
});

function Menu(props) {
  var classes = useStyles();

  function onKeyPress(event) {
    if (event.key === "Enter") {
      props.onSearch(event.target.value);
    }
  }

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
          "div",
          { className: classes.search },
          React.createElement(
            "div",
            { className: classes.searchIcon },
            React.createElement(
              "span",
              { className: "material-icons" },
              "search"
            )
          ),
          React.createElement(InputBase, {
            placeholder: "Search\u2026",
            classes: {
              root: classes.inputRoot,
              input: classes.inputInput
            },
            inputProps: { 'aria-label': 'search' },
            onKeyPress: onKeyPress
          })
        )
      )
    )
  );
}