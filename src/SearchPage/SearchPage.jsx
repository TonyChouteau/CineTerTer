function SearchPage(props) {

	const [query, setQuery] = React.useState("");
	const [data, setData] = React.useState([]);

	if (query != props.query) {
		setQuery(props.query);
		fetch("https://api.themoviedb.org/3/search/movie?api_key="+API_KEY+"&query="+props.query)
		.then(response => response.json())
		.then(data => {
			if (data.results) {
				let dataList = [];
				for (let i in data.results) {
					dataList.push(data.results[i]);
				}
				setData(dataList);
				console.log("x")
			}
		})
	}

	return <div className="list">
		{data.map(data => 
			<div>
				{data.title}
			</div>
		)}
	</div>
}