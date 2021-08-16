function App() {
	return React.createElement(
		'div',
		null,
		'Hello World !'
	);
}

// Add ReactApp to DOM
var domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(App, null), domContainer);