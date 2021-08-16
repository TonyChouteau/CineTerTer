function App() {
		return (
				<ReactRouterDOM.HashRouter>
						<Menu></Menu>

						<Route path="/" exact component={SearchPage}></Route>
						<Route path="/info" component={InfoPage}></Route>
						<Route path="/login" component={LoginPage}></Route>
				</ReactRouterDOM.HashRouter>
		);
}

// Add ReactApp to DOM
let domContainer = document.querySelector("#app");
ReactDOM.render(<App />, domContainer);
