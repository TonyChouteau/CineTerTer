const appStyles = makeStyles((theme) => ({
  root: {
    background: THEME.palette.primary.background,
    color: THEME.palette.primary.text,
  },
}));

function App() {
  const classes = appStyles();

  const [query, setQuery] = React.useState("Star Wars");

  const searchPage = () => <SearchPage query={query}></SearchPage>;
  const infoPage = () => <InfosPage></InfosPage>;

  function onSearch(newQuery) {
    setQuery(newQuery);
  }

  return (
    <div className={classes.root}>
      <ReactRouterDOM.HashRouter>
        <Menu onSearch={onSearch} query={query}></Menu>
        <Route path="/" exact component={searchPage}></Route>
        <Route path="/stats" component={infoPage}></Route>
        <Route path="/login" component={LoginPage}></Route>
      </ReactRouterDOM.HashRouter>
    </div>
  );
}

// Add ReactApp to DOM
let domContainer = document.querySelector("#app");
ReactDOM.render(<App />, domContainer);
