// Base URLs

const API_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p";

const IMG_ERROR = "resources/images/error.png";

// API Params

const API_KEY_PARAM = "?api_key=" + API_KEY;
const QUERY_PARAM = "&query=";

const PAGE_PARAM = "&page=";

// API URLs

const SEARCH_MOVIE = "/search/movie";

// Images URLS

const SIZE_w500 = "/w500";
const SIZE_original = "/original";

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
    },
    third: {
      background: "#222",
    },
  },
  size: {
    appBar: "70px",
    footer: "200px",
  },
};
