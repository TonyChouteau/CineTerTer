// Base URLs

const API_BASE_URL = "/api";
const THE_MOVIE_DB_BASE_URL = API_BASE_URL + "/themoviedb";

const API_URL = THE_MOVIE_DB_BASE_URL + "/data";
const IMG_URL = THE_MOVIE_DB_BASE_URL + "/image";

const MOVIE_URL = "/movie/";
const LOGIN_URL = "/login";

// API Params

const API_KEY_PARAM = "api_key=API_KEY";
const QUERY_PARAM = "query=";
const LANGUAGE_PARAM = "language=";
const REGION_PARAM = "region=";

const PAGE_PARAM = "page=";

const ID_PARAM = "id=";

// API URLs

const SEARCH_MOVIE = "/search/movie";

// Images URLS

const SIZE_w500 = "/w500";
const SIZE_original = "/original";

const IMG_ERROR = "resources/images/error.png";

// Theme

const THEME = {
  palette: {
    primary: {
      main: "#5970f3",
      background: "#333",
      text: "#fff",
    },
    secondary: {
      main: "#b71c1c",
      background: "#424242",
      text: "#ccc",
    },
    third: {
      background: "#222",
    },
  },
  size: {
    appBar: "70px",
    footer: "125px",
  },
};
