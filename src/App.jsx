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
    admin: g_is_admin,
  });
  const [user, setUser] = React.useState("");

  if (!logInfo.logged && user) {
    setUser("");
  }

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

  function getUser() {
    fetch(USER_URL)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.data);
      });
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
  const userPage = () => (
    <UserPage lang={lang} user={user} getUser={getUser}></UserPage>
  );
  const searchPage = () => <SearchPage query={query} lang={lang}></SearchPage>;
  const moviePage = () => <MoviePage lang={lang}></MoviePage>;
  const changelogPage = () => <ChangelogPage lang={lang}></ChangelogPage>;
  const usersPage = () => <UsersPage lang={lang} user={user}></UsersPage>;

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
            setLogInfo={setLogInfo}
            logInfo={logInfo}
            user={user}
            getUser={getUser}
          ></Menu>
          <Route path="/login" render={loginPage}></Route>
          <Route path="/user" component={userPage}></Route>
          <Route path="/movie" component={moviePage}></Route>
          <Route path="/users" component={usersPage}></Route>
          <Route path="/changelog" component={changelogPage}></Route>
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
