var versionStyles = makeStyles(function (theme) {
  return {
    root: {
      margin: "10px",
      textAlign: "center"
    }
  };
});

function Version() {
  var classes = versionStyles();

  return React.createElement(
    Typography,
    { className: classes.root },
    VERSION
  );
}