var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var movieStyles = makeStyles(function (theme) {
  return {
    root: {
      minHeight: "calc(100vh - " + THEME.size.appBar + " - " + THEME.size.footer + ")"
    },
    paper: {
      background: THEME.palette.secondary.background,
      padding: theme.spacing(2),
      margin: "10px",
      color: THEME.palette.primary.text
    },
    img: {
      width: "200px"
    },
    margin: {
      margin: "10px"
    },
    rightMargin: {
      marginRight: "20px"
    },
    greyText: {
      color: THEME.palette.secondary.text
    },
    row: {
      display: "flex",
      flexDirection: "row"
    }
  };
});

function MoviePage(props) {
  var classes = movieStyles();

  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      data = _React$useState2[0],
      setData = _React$useState2[1];

  var id = getParam("/movie", "id");

  if (JSON.stringify(data) === "{}") {
    fetch(getApiMovie(id)).then(function (response) {
      return response.json();
    }).then(function (data) {
      setData(data);
      console.log(data);
    });
  }

  return React.createElement(
    "div",
    { className: classes.root },
    React.createElement(
      Paper,
      { className: classes.paper },
      React.createElement(
        Grid,
        { container: true, spacing: 2 },
        React.createElement(
          Grid,
          { item: true },
          React.createElement("img", {
            className: classes.img,
            alt: "Error loading the image",
            src: getImage(SIZE_w500, data.poster_path)
          })
        ),
        React.createElement(
          Grid,
          { item: true, container: true, xs: 12, sm: true },
          React.createElement(
            Grid,
            { item: true },
            React.createElement(
              Typography,
              { className: classes.margin, variant: "h5" },
              data.title,
              " (",
              getYear(data.release_date),
              ")"
            ),
            React.createElement(
              Typography,
              {
                className: makeClass(classes.margin, classes.greyText)
              },
              data.release_date
            ),
            React.createElement(
              Typography,
              { className: classes.margin },
              data.overview
            ),
            React.createElement(
              Grid,
              {
                className: makeClass(classes.margin, classes.row),
                item: true,
                xs: 12,
                sm: true
              },
              React.createElement(
                Typography,
                {
                  className: makeClass(classes.rightMargin, classes.greyText)
                },
                "Duration : ",
                getDuration(data.runtime)
              ),
              React.createElement(
                Typography,
                { className: makeClass(classes.rightMargin, classes.greyText) },
                "Status : ",
                data.status
              ),
              React.createElement(
                Typography,
                { className: classes.greyText },
                "Language : ",
                getLanguage(data.original_language).name,
                " (",
                getLanguage(data.original_language).nativeName,
                ")"
              )
            ),
            React.createElement(
              Grid,
              {
                className: makeClass(classes.margin, classes.row),
                item: true,
                xs: 12,
                sm: true
              },
              React.createElement(
                Typography,
                {
                  className: makeClass(classes.rightMargin, classes.greyText)
                },
                "Budget : ",
                getRevenue(data.budget)
              ),
              React.createElement(
                Typography,
                { className: classes.greyText },
                "Revenue : ",
                getRevenue(data.revenue)
              )
            )
          )
        )
      )
    )
  );
}