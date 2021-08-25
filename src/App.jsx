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
  const [logInfo, setLogInfo] = React.useState({
    username: "$",
    password: "",
    error: false,
    logged: g_is_logged,
    logging: false,
  });

  function onSearch(event) {
    if (event.key === "Enter" && window.location.hash !== "#/") {
      goToUrl("/", QUERY_PARAM + event.target.value);
    } else {
      setQuery(event.target.value);
    }
  }

  function onLanguageChange(lang) {
    setCookie("lang", lang, 365);
    setLang(lang);
  }

  let cookieLang = getCookie("lang");
  if (cookieLang !== "" && cookieLang !== lang) {
    setLang(cookieLang);
  } else {
    setCookie("lang", lang, 365);
  }

  //==================
  // RENDER
  //==================

  const loginPage = () => (
    <LoginPage
      lang={lang}
      setLogInfo={setLogInfo}
      logInfo={logInfo}
    ></LoginPage>
  );
  const searchPage = () => <SearchPage query={query} lang={lang}></SearchPage>;
  const moviePage = () => <MoviePage lang={lang}></MoviePage>;
  const infoPage = () => <InfosPage lang={lang}></InfosPage>;

  function RedirectIf401() {
    if (logInfo.logged === false && !getCurrentUrl().includes("login")) {
      React.useEffect(() => {
        let newLogInfo = { ...logInfo, logging: true };
        setLogInfo(newLogInfo);
      }, []);
      return <Redirect to="/login"></Redirect>;
    } else {
      return "";
    }
  }

  return (
    <div className={classes.root}>
      <ThemeProvider theme={createTheme(THEME)}>
        <HashRouter>
          <RedirectIf401></RedirectIf401>
          <Menu
            onSearch={onSearch}
            query={query}
            lang={lang}
            onLanguageChange={onLanguageChange}
          ></Menu>
          <Route path="/movie" component={moviePage}></Route>
          <Route path="/stats" component={infoPage}></Route>
          <Route path="/login" render={loginPage}></Route>
          <Route path="/" exact component={searchPage}></Route>
          <Footer lang={lang}></Footer>
        </HashRouter>
      </ThemeProvider>
    </div>
  );
}

// Add ReactApp to DOM
let domContainer = document.querySelector("#app");
ReactDOM.render(<App />, domContainer);
