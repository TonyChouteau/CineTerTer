var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function SearchPage(props) {
	var _React$useState = React.useState(""),
	    _React$useState2 = _slicedToArray(_React$useState, 2),
	    query = _React$useState2[0],
	    setQuery = _React$useState2[1];

	var _React$useState3 = React.useState([]),
	    _React$useState4 = _slicedToArray(_React$useState3, 2),
	    data = _React$useState4[0],
	    setData = _React$useState4[1];

	if (query != props.query) {
		setQuery(props.query);
		fetch("https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query=" + props.query).then(function (response) {
			return response.json();
		}).then(function (data) {
			if (data.results) {
				setData(data.results);
				console.log("x");
			}
		});
	}

	return React.createElement(
		"div",
		{ className: "list" },
		data.map(function (data) {
			return React.createElement(
				"div",
				null,
				data.title
			);
		})
	);
}