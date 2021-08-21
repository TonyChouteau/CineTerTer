const resultsStyles = makeStyles((theme) => ({
  root: {
    minHeight: `calc(100vh - ${THEME.size.appBar} - ${THEME.size.footer})`,
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
}));

function Results(props) {
  const classes = resultsStyles();
  const data = props.data;

  if (data.results && data.results.length) {
    const plural = data.total_results > 1;
    return (
      <div className={classes.flex}>
        <Typography className={classes.margin}>
          {data.total_results} result{plural ? "s" : ""} found (
          {data.results.length} displayed).
        </Typography>
        <List className={makeClass(classes.item, classes.noPadding)}>
          {data.results.map((data, id) => (
            <Item key={id} data={data} query={props.query}></Item>
          ))}
        </List>
      </div>
    );
  } else if (!g_pageLoaded || props.query === "") {
    return "";
  } else {
    return (
      <div className={makeClass(classes.root, classes.flex)}>
        <Typography>No result</Typography>
      </div>
    );
  }
}
