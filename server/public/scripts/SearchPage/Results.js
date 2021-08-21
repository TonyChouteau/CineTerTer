var resultsStyles = makeStyles(function (theme) {
  return {
    root: {
      minHeight:
        "calc(100vh - " + THEME.size.appBar + " - " + THEME.size.footer + ")",
    },
    margin: {
      margin: "10px 10px 0 10px",
    },
    noPadding: {
      paddingTop: "0",
    },
    item: {
      width: "100%",
    },
    flex: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

function Results(props) {
  var classes = resultsStyles();
  var data = props.data;

  if (data.results && data.results.length) {
    var plural = data.total_results > 1;
    return React.createElement(
      "div",
      { className: classes.flex },
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
      React.createElement(
        List,
        { className: makeClass(classes.item, classes.noPadding) },
        data.results.map(function (data, id) {
          return React.createElement(Item, { key: id, data: data });
        })
      )
    );
  } else if (!g_pageLoaded || props.query === "") {
    return "";
  } else {
    return React.createElement(
      "div",
      { className: makeClass(classes.root, classes.flex) },
      React.createElement(Typography, null, "No result")
    );
  }
}