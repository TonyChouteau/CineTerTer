var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var g_pageLoaded = false;

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

  var _React$useState = React.useState("sda"),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      query = _React$useState2[0],
      setQuery = _React$useState2[1];

  var searchPage = function searchPage() {
    return React.createElement(SearchPage, { query: query });
  };
  var infoPage = function infoPage() {
    return React.createElement(InfosPage, null);
  };

  function onSearch(newQuery) {
    setQuery(newQuery);
  }

  return React.createElement(
    "div",
    { className: classes.root },
    React.createElement(
      ReactRouterDOM.HashRouter,
      null,
      React.createElement(Menu, { onSearch: onSearch, query: query }),
      React.createElement(Route, { path: "/", exact: true, component: searchPage }),
      React.createElement(Route, { path: "/stats", component: infoPage }),
      React.createElement(Route, { path: "/login", component: LoginPage }),
      React.createElement(Footer, null)
    )
  );
}

// Add ReactApp to DOM
var domContainer = document.querySelector("#app");
ReactDOM.render(React.createElement(App, null), domContainer);