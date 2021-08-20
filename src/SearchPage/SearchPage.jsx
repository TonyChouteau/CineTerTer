const searchStyles = makeStyles((theme) => ({
  root: {
    minHeight: `calc(100vh - ${THEME.size.appBar} - ${THEME.size.footer})`,
  },
  margin: {
    margin: "10px",
  }
}));

function SearchPage(props) {
  const classes = searchStyles();

  const [query, setQuery] = React.useState("");
  const [data, setData] = React.useState({});

  function getList(page) {
    const _data = data;
    fetch(getApi(query || props.query, page || 1))
      .then((response) => response.json())
      .then((data) => {
        g_pageLoaded = true;
        if (data.results) {
          if (page !== 1 && page !== undefined && page !== null) {
            let newData = [];
            newData.push(..._data.results);
            newData.push(...data.results);
            data.results = newData;
            setData(data);
          } else {
            setData(data);
          }
        }
      });
  }

  if (query != props.query) {
    setQuery(props.query);
    g_pageLoaded = false;
    getList();
  }

  console.log(data);

  $(window)
    .off()
    .on("scroll", () => {
      if (
        window.pageYOffset + document.body.clientHeight >
          $("#app").height() - 50 &&
        g_pageLoaded && data.page < data.total_pages
      ) {
        g_pageLoaded = false;
        getList(data.page+1);
      }
    });

  function DisplayList() {
    if (data.results && data.results.length) {
      const plural = data.total_results > 1;
      return (
        <div>
          <Typography className={classes.margin}>{data.total_results} result{plural ? "s" : ""} found ({data.results.length} displayed).</Typography>
          {data.results.map((data, id) => (
            <Item key={id} data={data}></Item>
          ))}
        </div>
      );
    } else if (!g_pageLoaded || props.query === "") {
      return "";
    } else {
      return <Typography>No result</Typography>;
    }
  }

  return (
    <div className={classes.root}>
      <DisplayList></DisplayList>
    </div>
  );
}
