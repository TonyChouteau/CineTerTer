var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var g_pageLoaded = false;
var g_lastMovieData = null;

var appStyles = makeStyles(function (theme) {
  return {
    root: {
      background: THEME.palette.primary.background,
      color: THEME.palette.primary.text,
      minHeight: "100vh"
    },
    bottomMargin: {
      height: "1px",
      background: "transparent"
    }
  };
});

function App() {
  var classes = appStyles();

  var queryParam = getParam("/", "query");

  var _React$useState = React.useState(queryParam || ""),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      query = _React$useState2[0],
      setQuery = _React$useState2[1];

  var _React$useState3 = React.useState(LANGUAGE_AVAILABLE[0]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      lang = _React$useState4[0],
      setLang = _React$useState4[1];

  var _React$useState5 = React.useState({
    username: "$",
    password: "",
    error: false,
    logged: g_is_logged,
    logging: false,
    admin: g_is_admin
  }),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      logInfo = _React$useState6[0],
      setLogInfo = _React$useState6[1];

  var _React$useState7 = React.useState(""),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      user = _React$useState8[0],
      setUser = _React$useState8[1];

  if (!logInfo.logged && user) {
    setUser("");
  }

  function onSearch(event) {
    if (event.key === "Enter" && window.location.hash !== "#/") {
      goToUrl("/", QUERY_PARAM + event.target.value);
    } else {
      setQuery(event.target.value);
    }
  }

  function onLanguageChange(lang) {
    setCookie("lang", lang, 365);
    setLang(lang);
  }

  function getUser() {
    fetch(USER_URL).then(function (response) {
      return response.json();
    }).then(function (data) {
      setUser(data.data);
    });
  }

  var cookieLang = getCookie("lang");
  if (cookieLang !== "" && cookieLang !== lang) {
    setLang(cookieLang);
  } else {
    setCookie("lang", lang, 365);
  }

  //==================
  // RENDER
  //==================

  var loginPage = function loginPage() {
    return React.createElement(LoginPage, {
      lang: lang,
      setLogInfo: setLogInfo,
      logInfo: logInfo
    });
  };
  var userPage = function userPage() {
    return React.createElement(UserPage, { lang: lang, user: user, getUser: getUser });
  };
  var searchPage = function searchPage() {
    return React.createElement(SearchPage, { query: query, lang: lang });
  };
  var moviePage = function moviePage() {
    return React.createElement(MoviePage, { lang: lang });
  };
  var changelogPage = function changelogPage() {
    return React.createElement(ChangelogPage, { lang: lang });
  };

  function RedirectIf401() {
    if (logInfo.logged === false && !getCurrentUrl().includes("login")) {
      React.useEffect(function () {
        var newLogInfo = Object.assign({}, logInfo, { logging: true });
        setLogInfo(newLogInfo);
      }, []);
      return React.createElement(Redirect, { to: "/login" });
    } else {
      return "";
    }
  }

  return React.createElement(
    "div",
    { className: classes.root },
    React.createElement(
      ThemeProvider,
      { theme: createTheme(THEME) },
      React.createElement(
        HashRouter,
        null,
        React.createElement(RedirectIf401, null),
        React.createElement(Menu, {
          onSearch: onSearch,
          query: query,
          lang: lang,
          onLanguageChange: onLanguageChange,
          setLogInfo: setLogInfo,
          logInfo: logInfo,
          user: user,
          getUser: getUser
        }),
        React.createElement(Route, { path: "/login", render: loginPage }),
        React.createElement(Route, { path: "/user", component: userPage }),
        React.createElement(Route, { path: "/movie", component: moviePage }),
        React.createElement(Route, { path: "/changelog", component: changelogPage }),
        React.createElement(Route, { path: "/", exact: true, component: searchPage }),
        React.createElement(Footer, { lang: lang })
      )
    )
  );
}

// Add ReactApp to DOM
var domContainer = document.querySelector("#app");
ReactDOM.render(React.createElement(App, null), domContainer);