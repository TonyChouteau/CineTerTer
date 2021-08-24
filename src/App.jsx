let g_pageLoaded = false;
let g_lastMovieData = null;

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
  const [lang, setLang] = React.useState(LANGUAGE_AVAILABLE[0]);
  const [isLogged, setIsLogged] = React.useState(g_is_logged);

  const searchPage = () => <SearchPage query={query} lang={lang}></SearchPage>;
  const infoPage = () => <InfosPage lang={lang}></InfosPage>;
  const moviePage = () => <MoviePage lang={lang}></MoviePage>;
  const loginPage = () => <LoginPage lang={lang}></LoginPage>;

  function onSearch(event) {
    if (event.key === "Enter" && window.location.hash !== "#/") {
      goToUrl("/", QUERY_PARAM + event.target.value);
    } else {
      setQuery(event.target.value);
    }
  }

  function RedirectIf401() {
    if (isLogged === false && !getCurrentUrl().includes("login")) {
      React.useEffect(() => {
        setIsLogged("logging");
      }, []);
      return <Redirect to="/login"></Redirect>;
    } else {
      return "";
    }
  }

  return (
    <div className={classes.root}>
      <HashRouter>
        <RedirectIf401></RedirectIf401>
        <Menu
          onSearch={onSearch}
          query={query}
          lang={lang}
          onLanguageChange={setLang}
        ></Menu>
        <Route path="/movie" component={moviePage}></Route>
        <Route path="/stats" component={infoPage}></Route>
        <Route path="/login" component={loginPage}></Route>
        <Route path="/" exact component={searchPage}></Route>
        <Footer lang={lang}></Footer>
      </HashRouter>
    </div>
  );
}

// Add ReactApp to DOM
let domContainer = document.querySelector("#app");
ReactDOM.render(<App />, domContainer);
