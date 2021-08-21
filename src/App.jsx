let g_pageLoaded = false;

const appStyles = makeStyles((theme) => ({
  root: {
    background: THEME.palette.primary.background,
    color: THEME.palette.primary.text,
    minHeight: "100vh",
  },
  bottomMargin: {
    height: "1px",
    background: "transparent",
  },
}));

function App() {
  const classes = appStyles();

  let queryParam = getParam("/", "query");
  const [query, setQuery] = React.useState(queryParam || "");

  const searchPage = () => <SearchPage query={query}></SearchPage>;
  const infoPage = () => <InfosPage></InfosPage>;
  const moviePage = () => <MoviePage></MoviePage>;

  function onSearch(event) {
    if (event.key === "Enter" && window.location.hash !== "#/") {
      goToUrl("/", QUERY_PARAM + event.target.value);
    } else {
      setQuery(event.target.value);
    }
  }

  return (
    <div className={classes.root}>
      <HashRouter>
        <Menu onSearch={onSearch} query={query}></Menu>
        <Route path="/movie" component={moviePage}></Route>
        <Route path="/stats" component={infoPage}></Route>
        <Route path="/" exact component={searchPage}></Route>
        <Footer></Footer>
      </HashRouter>
    </div>
  );
}

// Add ReactApp to DOM
let domContainer = document.querySelector("#app");
ReactDOM.render(<App />, domContainer);
