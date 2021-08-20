var itemStyles = makeStyles(function (theme) {
  return {
    paper: {
      padding: theme.spacing(2),
      height: "fit-content",
      background: THEME.palette.secondary.background,
      color: THEME.palette.primary.text,
    },
    img_grid: {
      width: "200px",
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "calc(200px - 16px)",
    },
    margin: {
      margin: "10px",
    },
  };
});

function Item(props) {
  var classes = itemStyles();

  var data = props.data;

  return React.createElement(
    Paper,
    { className: makeClass(classes.paper, classes.margin) },
    React.createElement(
      Grid,
      { container: true, spacing: 2 },
      React.createElement(
        Grid,
        { item: true, className: classes.img_grid },
        React.createElement("img", {
          className: classes.img,
          alt: "Error loading the image",
          src: getImage(SIZE_w500, data.poster_path),
        })
      ),
      React.createElement(
        Grid,
        { item: true, xs: 12, sm: true, className: classes.grid },
        React.createElement(
          Typography,
          { className: classes.margin, variant: "h5" },
          data.title
        ),
        React.createElement(
          Typography,
          { className: classes.margin },
          data.release_date
        ),
        React.createElement(Rating, {
          className: classes.margin,
          value: data.vote_average,
          count: data.vote_count,
        }),
        React.createElement(
          Typography,
          { className: classes.margin },
          data.overview
        )
      )
    )
  );
}
