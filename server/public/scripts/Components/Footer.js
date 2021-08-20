var footerStyles = makeStyles(function (theme) {
  return {
    root: {
      background: THEME.palette.third.background,
      height: THEME.size.footer,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    link: {
      textDecoration: "none",
      color: THEME.palette.primary.main
    }
  };
});

function Footer() {
  var classes = footerStyles();

  return React.createElement(
    "div",
    { className: classes.root },
    React.createElement(
      Typography,
      null,
      "Made by",
      " ",
      React.createElement(
        Link,
        { className: classes.link, target: "_blank", rel: "noreferrer", href: "https://www.tonychouteau.fr" },
        "Tony Chouteau"
      )
    ),
    React.createElement(
      Typography,
      null,
      "Using",
      " ",
      React.createElement(
        Link,
        { className: classes.link, target: "_blank", rel: "noreferrer", href: "https://www.themoviedb.org/" },
        "The Movie DB"
      ),
      " ",
      "Api"
    ),
    React.createElement(
      Typography,
      null,
      React.createElement(
        Link,
        { className: classes.link, target: "_blank", rel: "noreferrer", href: "https://github.com/TonyChouteau" },
        "Github"
      )
    )
  );
}