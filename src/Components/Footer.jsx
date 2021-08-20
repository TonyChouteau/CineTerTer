const footerStyles = makeStyles((theme) => ({
  root: {
    background: THEME.palette.third.background,
    height: THEME.size.footer,
  },
}));

function Footer(props) {
  const classes = footerStyles();

  return <div className={classes.root}></div>;
}
