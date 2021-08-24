const footerStyles = makeStyles((theme) => ({
  root: {
    background: THEME.palette.third.background,
    height: THEME.size.footer,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    textDecoration: "none",
    color: THEME.palette.primary.main,
  },
}));

function Footer(props) {
  const classes = footerStyles();

  return (
    <div className={classes.root}>
      <Typography>
        {translateFooter("made_by", props.lang)}{" "}
        <Link
          className={classes.link}
          target="_blank"
          rel="noreferrer"
          href="https://www.tonychouteau.fr"
        >
          Tony Chouteau
        </Link>
      </Typography>
      <Typography>
        {translateFooter("using", props.lang)}{" "}
        <Link
          className={classes.link}
          target="_blank"
          rel="noreferrer"
          href="https://www.themoviedb.org/"
        >
          The Movie DB
        </Link>{" "}
        Api
      </Typography>
      <Typography>
        {translateFooter("github", props.lang)}{" "}
        <Link
          className={classes.link}
          target="_blank"
          rel="noreferrer"
          href="https://github.com/TonyChouteau/CineTerTer"
        >
          Github
        </Link>
      </Typography>
    </div>
  );
}
