// Base URLs

var API_URL = "https://api.themoviedb.org/3";
var IMG_URL = "https://image.tmdb.org/t/p";

var IMG_ERROR = "resources/images/error.png";

// API Params

var API_KEY_PARAM = "?api_key=" + API_KEY;
var QUERY_PARAM = "&query=";

var PAGE_PARAM = "&page=";

// API URLs

var SEARCH_MOVIE = "/search/movie";

// Images URLS

var SIZE_w500 = "/w500";
var SIZE_original = "/original";

// Theme

var THEME = {
  palette: {
    primary: {
      main: "#b71c1c",
      background: "#333",
      text: "#fff"
    },
    secondary: {
      main: "#c2185b",
      background: "#424242"
    },
    third: {
      background: "#222"
    }
  },
  size: {
    appBar: "70px",
    footer: "200px"
  }
};