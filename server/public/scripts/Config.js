// Base URLs

var API_BASE_URL = "/api";
var THE_MOVIE_DB_BASE_URL = API_BASE_URL + "/themoviedb";

var API_URL = THE_MOVIE_DB_BASE_URL + "/data";
var IMG_URL = THE_MOVIE_DB_BASE_URL + "/image";

var MOVIE_URL = "/movie/";
var LOGIN_URL = "/login";

// API Params

var API_KEY_PARAM = "api_key=API_KEY";
var QUERY_PARAM = "query=";
var LANGUAGE_PARAM = "language=";
var REGION_PARAM = "region=";

var PAGE_PARAM = "page=";

var ID_PARAM = "id=";

// API URLs

var SEARCH_MOVIE = "/search/movie";

// Images URLS

var SIZE_w500 = "/w500";
var SIZE_original = "/original";

var IMG_ERROR = "resources/images/error.png";

// Theme

var THEME = {
  palette: {
    primary: {
      main: "#5970f3",
      background: "#333",
      text: "#fff"
    },
    secondary: {
      main: "#b71c1c",
      background: "#424242",
      text: "#ccc"
    },
    third: {
      background: "#222"
    }
  },
  size: {
    appBar: "70px",
    footer: "125px"
  }
};