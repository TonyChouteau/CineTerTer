var _slicedToArray = (function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    }
  };
})();

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var menuStyles = makeStyles(function (theme) {
  return {
    root: {
      flexGrow: 1,
    },
    appBar: {
      minHeight: THEME.size.appBar,
    },
    title: {
      flexGrow: 1,
    },
    active: {
      color: "#BBB",
    },
    list: {
      display: "flex",
    },
    link: {
      textDecoration: "none",
      color: "white",
    },
    search: _defineProperty(
      {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#ffffff22",
        "&:hover": {
          backgroundColor: "#ffffff33",
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
      },
      theme.breakpoints.up("sm"),
      {
        marginLeft: theme.spacing(3),
        width: "auto",
      }
    ),
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: _defineProperty(
      {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: "calc(1em + " + theme.spacing(4) + "px)",
        transition: theme.transitions.create("width"),
        width: "100%",
      },
      theme.breakpoints.up("md"),
      {
        width: "20ch",
      }
    ),
  };
});

function Menu(props) {
  var classes = menuStyles();

  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    openDrawer = _React$useState2[0],
    setOpenDrawer = _React$useState2[1];

  function onKeyPress(event) {
    if (event.key === "Enter" && window.location.pathname !== "/") {
      window.location.replace("/?query=" + event.target.value);
    } else {
      props.onSearch(event.target.value);
    }
  }

  return React.createElement(
    "div",
    { className: classes.root },
    React.createElement(
      ThemeProvider,
      { theme: createTheme(THEME) },
      React.createElement(AppDrawer, {
        open: openDrawer,
        closeDrawer: function closeDrawer() {
          return setOpenDrawer(false);
        },
      }),
      React.createElement(
        AppBar,
        { position: "static", color: "primary" },
        React.createElement(
          Toolbar,
          { className: classes.appBar },
          React.createElement(
            IconButton,
            {
              edge: "start",
              className: classes.menuButton,
              color: "inherit",
              "aria-label": "menu",
              onClick: function onClick() {
                return setOpenDrawer(true);
              },
            },
            React.createElement("span", { className: "material-icons" }, "menu")
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
                input: classes.inputInput,
              },
              inputProps: { "aria-label": "search" },
              onChange: onKeyPress,
              onKeyPress: onKeyPress,
              value: props.query,
            })
          )
        )
      )
    )
  );
}
