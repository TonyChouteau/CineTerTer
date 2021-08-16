function App() {
  
  const [query, setQuery] = React.useState("");

  const searchPage = () => <SearchPage query={query}></SearchPage>
  const infoPage = () => <StatsPage></StatsPage>

  function onSearch(newQuery) {
    setQuery(newQuery);
  }

  return (
    <ReactRouterDOM.HashRouter>
      <Menu onSearch={onSearch}></Menu>
      <Route path="/" exact component={searchPage}></Route>
      <Route path="/stats" component={infoPage}></Route>
      <Route path="/login" component={LoginPage}></Route>
    </ReactRouterDOM.HashRouter>
  );
}

// Add ReactApp to DOM
let domContainer = document.querySelector("#app");
ReactDOM.render(<App />, domContainer);
