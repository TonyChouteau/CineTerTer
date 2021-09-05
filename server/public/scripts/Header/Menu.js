var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var menuStyles = makeStyles(function (theme) {
  var _search;

  return {
    root: {
      flexGrow: 1
    },
    appBar: {
      minHeight: THEME.size.appBar,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    appBarSide: {
      display: "flex"
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
    search: (_search = {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: "#ffffff22",
      "&:hover": {
        backgroundColor: "#ffffff33"
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%"
    }, _defineProperty(_search, theme.breakpoints.up("sm"), {
      marginLeft: theme.spacing(3),
      width: "auto"
    }), _defineProperty(_search, "display", "flex"), _search),
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: _defineProperty({
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: "calc(1em + " + theme.spacing(4) + "px)",
      transition: theme.transitions.create("width"),
      width: "100%"
    }, theme.breakpoints.up("md"), {
      width: "20ch"
    }),
    rLink: {
      textDecoration: "none",
      color: "inherit",
      "&:hover": {
        color: "inherit"
      }
    },
    item: {
      "&:hover": {
        background: THEME.palette.secondary.background
      }
    },
    popover: {
      "& .MuiPopover-paper": {
        marginTop: "40px",
        background: THEME.palette.primary.background,
        color: THEME.palette.primary.text
      }
    },
    whiteText: {
      color: THEME.palette.primary.text
    },
    icon: {
      minWidth: "40px"
    }
  };
});

function Menu(props) {
  var classes = menuStyles();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      openDrawer = _React$useState2[0],
      setOpenDrawer = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      anchorEl = _React$useState4[0],
      setAnchorEl = _React$useState4[1];

  var handleClick = function handleClick(event) {
    setAnchorEl(event.currentTarget);
  };

  var handleClose = function handleClose() {
    setAnchorEl(null);
  };

  function onKeyPress(event) {
    props.onSearch(event);
  }

  function onLanguageChange(event) {
    props.onLanguageChange(event.target.value);
  }

  if (props.user === "" && props.logInfo.logged) {
    fetch(USER_URL).then(function (response) {
      return response.json();
    }).then(function (data) {
      props.setUser(data.data);
    });
  }

  if (props.user !== "" && !props.logInfo.logged) {
    props.setUser("");
  }

  function onSignout() {
    fetch(getLoginUrl(), {
      method: "DELETE"
    }).then(function () {
      var logInfo = {
        username: "-",
        password: "",
        error: false,
        logged: false,
        logging: false
      };
      props.setLogInfo(logInfo);
    });
  }

  var menu = [{
    name: "user",
    icon: "account_circle",
    url: getUserPage()
  }, {
    name: "signout",
    icon: "logout",
    onClick: onSignout
  }];

  return React.createElement(
    "div",
    { className: classes.root },
    React.createElement(AppDrawer, {
      open: openDrawer,
      closeDrawer: function closeDrawer() {
        return setOpenDrawer(false);
      },
      lang: props.lang,
      onLanguageChange: onLanguageChange
    }),
    React.createElement(
      AppBar,
      { position: "static", color: "primary", id: "appbar" },
      React.createElement(
        Toolbar,
        { className: classes.appBar },
        React.createElement(
          "div",
          { className: classes.appBarSide },
          React.createElement(
            IconButton,
            {
              edge: "start",
              className: classes.menuButton,
              color: "inherit",
              "aria-label": "menu",
              onClick: function onClick() {
                return setOpenDrawer(true);
              }
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
              placeholder: translateMenu("search", props.lang) + "...",
              classes: {
                root: classes.inputRoot,
                input: classes.inputInput
              },
              inputProps: { "aria-label": "search" },
              onChange: onKeyPress,
              onKeyPress: onKeyPress,
              value: props.query
            })
          )
        ),
        React.createElement(
          "div",
          null,
          props.logInfo.logged ? React.createElement(
            "div",
            null,
            React.createElement(
              IconButton,
              {
                edge: "start",
                className: classes.menuButton,
                color: "inherit",
                "aria-label": "menu",
                display: props.logInfo.logged ? "block" : "none",
                onClick: handleClick,
                title: "Account Page"
              },
              React.createElement(Avatar, {
                alt: props.user ? props.user.name : "",
                src: getLocalImage(AVATAR_URL, props.user ? props.user.id : "", ".png")
              })
            ),
            React.createElement(
              Popover,
              {
                anchorEl: anchorEl,
                keepMounted: true,
                open: Boolean(anchorEl),
                onClose: handleClose,
                className: classes.popover
              },
              React.createElement(
                List,
                null,
                menu.map(function (item) {
                  return React.createElement(
                    RLink,
                    {
                      key: item.name,
                      className: makeClass(classes.rLink, classes.whiteText),
                      onClick: function onClick() {
                        handleClose();
                        if (item.onClick) {
                          item.onClick();
                        }
                      },
                      to: item.url
                    },
                    React.createElement(
                      ListItem,
                      { className: classes.item },
                      React.createElement(
                        ListItemIcon,
                        {
                          className: makeClass(classes.whiteText, classes.icon)
                        },
                        React.createElement(
                          "span",
                          { className: "material-icons" },
                          item.icon
                        )
                      ),
                      React.createElement(
                        ListItemText,
                        { className: classes.itemText },
                        React.createElement(
                          Typography,
                          null,
                          translateLogin(item.name, props.lang)
                        )
                      )
                    )
                  );
                })
              )
            )
          ) : ""
        )
      )
    )
  );
}