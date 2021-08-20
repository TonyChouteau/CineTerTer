var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var searchStyles = makeStyles(function (theme) {
  return {
    root: {
      minHeight: "calc(100vh - " + THEME.size.appBar + " - " + THEME.size.footer + ")"
    },
    margin: {
      margin: "10px"
    }
  };
});

function SearchPage(props) {
  var classes = searchStyles();

  var _React$useState = React.useState(""),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      query = _React$useState2[0],
      setQuery = _React$useState2[1];

  var _React$useState3 = React.useState({}),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      data = _React$useState4[0],
      setData = _React$useState4[1];

  function getList(page) {
    var _data = data;
    fetch(getApi(query || props.query, page || 1)).then(function (response) {
      return response.json();
    }).then(function (data) {
      g_pageLoaded = true;
      if (data.results) {
        if (page !== 1 && page !== undefined && page !== null) {
          var newData = [];
          newData.push.apply(newData, _toConsumableArray(_data.results));
          newData.push.apply(newData, _toConsumableArray(data.results));
          data.results = newData;
          setData(data);
        } else {
          setData(data);
        }
      }
    });
  }

  if (query != props.query) {
    setQuery(props.query);
    g_pageLoaded = false;
    getList();
  }

  console.log(data);

  $(window).off().on("scroll", function () {
    if (window.pageYOffset + document.body.clientHeight > $("#app").height() - 50 && g_pageLoaded && data.page < data.total_pages) {
      g_pageLoaded = false;
      getList(data.page + 1);
    }
  });

  function DisplayList() {
    if (data.results && data.results.length) {
      var plural = data.total_results > 1;
      return React.createElement(
        "div",
        null,
        React.createElement(
          Typography,
          { className: classes.margin },
          data.total_results,
          " result",
          plural ? "s" : "",
          " found (",
          data.results.length,
          " displayed)."
        ),
        data.results.map(function (data, id) {
          return React.createElement(Item, { key: id, data: data });
        })
      );
    } else if (!g_pageLoaded || props.query === "") {
      return "";
    } else {
      return React.createElement(
        Typography,
        null,
        "No result"
      );
    }
  }

  return React.createElement(
    "div",
    { className: classes.root },
    React.createElement(DisplayList, null)
  );
}