function App() {
	return (
		<div>
			Hello World !
		</div>
	);
}

// Add ReactApp to DOM
let domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);