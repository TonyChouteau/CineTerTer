var changelogStyles = makeStyles(function (theme) {
  return {
    root: {
      minHeight: "calc(100vh - " + THEME.size.appBar + " - " + THEME.size.footer + ")"
    },
    paper: {
      margin: "10px",
      padding: theme.spacing(3),
      background: THEME.palette.secondary.background,

      "& .MuiTypography-h4": {
        marginBottom: "20px"
      },
      "& .MuiTypography-h5": {
        marginBottom: "10px",
        marginTop: "10px"
      }
    },
    whiteText: {
      color: "white"
    },
    greyText: {
      color: THEME.palette.secondary.text
    },
    multiline: {
      whiteSpace: "pre-wrap"
    },
    hr: {
      marginBottom: "20px",
      marginTop: "20px"
    }
  };
});

function ChangelogPage(props) {
  var classes = changelogStyles();

  var VERSIONS = [[0, "1.0", "Release of the web application for the first time. \nThe only actions possible for now are to edit your profile, view and add Reviews."], [1, "1.01", "Correct some bugs, password not hidden when typing. \nAdd success and error message."], [1, "1.02", "Add changelog in route and app drawer"]];

  return React.createElement(
    "div",
    { className: classes.root },
    React.createElement(
      Paper,
      { className: classes.paper },
      VERSIONS.reverse().map(function (version, id) {
        return React.createElement(
          React.Fragment,
          { key: id },
          version[0] === 0 ? React.createElement("hr", { className: classes.hr }) : "",
          React.createElement(
            Typography,
            {
              variant: "h" + (version[0] + 4),
              className: classes.whiteText
            },
            "Beta " + version[1]
          ),
          React.createElement(
            Typography,
            {
              className: makeClass(classes.grey, classes.multiline)
            },
            version[2]
          )
        );
      })
    )
  );
}