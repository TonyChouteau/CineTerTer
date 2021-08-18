function SearchPage(props) {
  const [query, setQuery] = React.useState("");
  const [data, setData] = React.useState([]);

  if (query != props.query) {
    setQuery(props.query);
    fetch(API_URL + SEARCH_MOVIE + API_KEY_PARAM + QUERY_PARAM + props.query)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setData(data.results);
          console.log(data.results);
        }
      });
  }

  return (
    <div className="list">
      {data.map((data, id) => (
        <Item key={id} data={data}></Item>
      ))}
    </div>
  );
}
