var scrollableStyles = makeStyles(function (theme) {
  return {
    root: {
      width: "100%",
      overflow: "auto"
    },
    list: {
      display: "flex",
      flexDirection: "row"
    },
    button: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "start"
    },
    card: {
      margin: "10px",
      overflow: "visible",
      background: THEME.palette.secondary.background,
      color: THEME.palette.primary.text
    },
    media: {
      height: "250px",
      width: "200px",
      backgroundPosition: "top"
    },
    whiteText: {
      color: THEME.palette.primary.text
    }
  };
});

function ScrollableCardList(props) {
  var classes = scrollableStyles();

  return React.createElement(
    "div",
    { className: classes.root },
    React.createElement(
      "div",
      { className: classes.list },
      props.data.slice(0, 10).map(function (item, id) {
        return React.createElement(
          Card,
          { className: classes.card, key: item.name },
          React.createElement(
            CardActionArea,
            { className: classes.button },
            React.createElement(CardMedia, {
              className: classes.media,
              image: props.image(item),
              title: props.title(item),
              key: id
            }),
            React.createElement(
              CardContent,
              null,
              React.createElement(
                Typography,
                { gutterBottom: true, variant: "h5", component: "h4" },
                props.title(item)
              ),
              React.createElement(
                Typography,
                { variant: "body2", component: "p" },
                props.content(item)
              )
            )
          )
        );
      })
    )
  );
}