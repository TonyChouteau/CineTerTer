const searchStyles = makeStyles((theme) => ({
  root: {
    minHeight: `calc(100vh - ${THEME.size.appBar} - ${THEME.size.footer})`,
  },
}));

const SearchPage = React.memo(function SearchPage(props) {
  const classes = searchStyles();

  const [query, setQuery] = React.useState("");
  const [data, setData] = React.useState({});

  function getList(page) {
    const _data = data;
    fetch(getApi(query || props.query, page || 1, props.lang))
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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

  $(window)
    .off()
    .on("scroll", () => {
      if (
        window.pageYOffset + document.body.clientHeight >
          $("#app").height() - 50 &&
        g_pageLoaded &&
        data.page < data.total_pages
      ) {
        g_pageLoaded = false;
        getList(data.page + 1);
      }
    });

  return (
    <div className={classes.root}>
      <Results data={data} query={props.query} lang={props.lang}></Results>
    </div>
  );
});
