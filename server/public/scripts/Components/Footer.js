var footerStyles = makeStyles(function (theme) {
  return {
    root: {
      background: THEME.palette.third.background,
      height: THEME.size.footer,
    },
  };
});

function Footer(props) {
  var classes = footerStyles();

  return React.createElement("div", { className: classes.root });
}
