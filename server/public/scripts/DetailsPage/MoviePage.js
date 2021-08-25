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
    titlePaper: {
      background: THEME.palette.secondary.background,
      color: THEME.palette.primary.text,
      padding: "5px 0"
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
    },
    paperList: {
      margin: "10px",
      width: "calc(100% - 20px)"
    },
    centerText: {
      textAlign: "center"
    }
  };
});

function MoviePage(props) {
  var classes = movieStyles();

  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      _data = _React$useState2[0],
      setData = _React$useState2[1];

  var id = getParam(MOVIE_PAGE_URL, "id");

  if (JSON.stringify(_data) === "{}") {
    fetch(getApiMovie(id, props.lang)).then(function (response) {
      return response.json();
    }).then(function (data) {
      setData(data);
      g_lastMovieData = data;
    });
  }

  // Prevent the display from reloading during a search (fucking disgusting but it works)
  var data = JSON.stringify(_data) !== "{}" ? _data : g_lastMovieData || {};

  var crew = [];
  var cast = [];
  if (data.credits) {
    cast = data.credits.cast.sortBy("popularity");

    var credits = {};
    for (var i in data.credits.crew) {
      var credit = data.credits.crew[i];
      var job = credit.job;
      if (credits[credit.name]) {
        credits[credit.name].job.push(job);
      } else {
        credits[credit.name] = credit;
        credits[credit.name].job = [job];
      }
    }
    crew = Object.values(credits).sortBy("popularity");
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
          data.poster_path ? React.createElement("img", {
            className: classes.img,
            alt: "Error loading the image",
            src: getImage(SIZE_w500, data.poster_path)
          }) : React.createElement(CircularProgress, null)
        ),
        React.createElement(
          Grid,
          { item: true, container: true, xs: 12, sm: true },
          React.createElement(
            Grid,
            { item: true },
            React.createElement(
              Grid,
              {
                className: makeClass(classes.rightMargin, classes.row),
                item: true,
                xs: 12,
                sm: true
              },
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
                  className: makeClass(classes.margin, classes.greyText),
                  variant: "h5"
                },
                getCollection(data.belongs_to_collection)
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
                data.release_date
              ),
              React.createElement(
                Typography,
                {
                  className: makeClass(classes.rightMargin, classes.greyText)
                },
                getDuration(data.runtime)
              ),
              React.createElement(
                Typography,
                {
                  className: makeClass(classes.rightMargin, classes.greyText)
                },
                getGenre(data.genres)
              )
            ),
            React.createElement(Rating, {
              className: classes.margin,
              value: data.vote_average,
              count: data.vote_count
            }),
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
                translateMoviePage("status", props.lang),
                " ",
                translateMoviePage(data.status, props.lang)
              ),
              React.createElement(
                Typography,
                { className: classes.greyText },
                translateMoviePage("lang", props.lang),
                " ",
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
                translateMoviePage("budget", props.lang),
                " ",
                getMoney(data.budget)
              ),
              React.createElement(
                Typography,
                { className: classes.greyText },
                translateMoviePage("revenue", props.lang),
                " ",
                getMoney(data.revenue)
              )
            )
          )
        )
      )
    ),
    React.createElement(
      "div",
      { className: classes.paperList },
      React.createElement(
        Paper,
        { className: classes.titlePaper },
        React.createElement(
          Typography,
          {
            className: makeClass(classes.margin, classes.centerText),
            variant: "h5"
          },
          "Crew"
        ),
        React.createElement(ScrollableCardList, {
          image: function image(item) {
            return getImage(SIZE_w500, item.profile_path);
          },
          title: function title(item) {
            return item.name;
          },
          content: function content(item) {
            return item.job.join(" - ");
          },
          data: crew
        })
      )
    ),
    React.createElement(
      "div",
      { className: classes.paperList },
      React.createElement(
        Paper,
        { className: classes.titlePaper },
        React.createElement(
          Typography,
          {
            className: makeClass(classes.margin, classes.centerText),
            variant: "h5"
          },
          "Cast"
        ),
        React.createElement(ScrollableCardList, {
          image: function image(item) {
            return getImage(SIZE_w500, item.profile_path);
          },
          title: function title(item) {
            return item.name;
          },
          content: function content(item) {
            return item.character;
          },
          data: cast
        })
      )
    )
  );
}