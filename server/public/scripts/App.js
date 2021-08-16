function App() {
		return React.createElement(
				ReactRouterDOM.HashRouter,
				null,
				React.createElement(Menu, null),
				React.createElement(Route, { path: "/", exact: true, component: SearchPage }),
				React.createElement(Route, { path: "/info", component: InfoPage }),
				React.createElement(Route, { path: "/login", component: LoginPage })
		);
}

// Add ReactApp to DOM
var domContainer = document.querySelector("#app");
ReactDOM.render(React.createElement(App, null), domContainer);