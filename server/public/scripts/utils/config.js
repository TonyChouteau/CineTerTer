// Base Api Urls

var API_BASE_URL = "/api";

//==================
// The Movie DB
//==================

var THE_MOVIE_DB_BASE_URL = API_BASE_URL + "/themoviedb";

var API_URL = THE_MOVIE_DB_BASE_URL + "/data";
var SEARCH_MOVIE = "/search/movie";

var IMG_URL = THE_MOVIE_DB_BASE_URL + "/image";
var SIZE_w500 = "/w500";
var SIZE_original = "/original";

// API Params

var API_KEY_PARAM = "api_key=API_KEY";
var QUERY_PARAM = "query=";
var LANGUAGE_PARAM = "language=";
var REGION_PARAM = "region=";

var PAGE_PARAM = "page=";

//==================
// Pages
//==================

var MOVIE_PAGE_URL = "/movie/";

var LOGIN_PAGE_URL = "/login";
var USER_PAGE_URL = "/user";
var USERS_PAGE_URL = "/users";

var ID_PARAM = "id=";

//==================
// Api Urls
//==================

var LOCAL_IMG_URL = API_BASE_URL + "/images";
var AVATAR_URL = LOCAL_IMG_URL + "/avatar";
var IMAGE_PNG = ".png";

var USERS_URL = API_BASE_URL + "/users";
var USER_URL = API_BASE_URL + "/user";
var REVIEWS_URL = API_BASE_URL + "/reviews";

var IMG_ERROR = "resources/images/error.png";

// Theme

var THEME = {
    palette: {
        primary: {
            main: "#5970f3",
            background: "#333",
            text: "#fff",
            border: "#fff",
            borderHover: "#ccc"
        },
        secondary: {
            main: "#3a50cf",
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

THEME["overrides"] = {
    MuiOutlinedInput: {
        root: {
            position: "relative",
            "& $notchedOutline": {
                borderWidth: "2px",
                borderColor: THEME.palette.primary.border
            },
            "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
                borderWidth: "2px",
                borderColor: THEME.palette.primary.borderHover,
                // Reset on touch devices, it doesn't add specificity
                "@media (hover: none)": {
                    borderWidth: "2px",
                    borderColor: THEME.palette.primary.border
                }
            },
            "&$focused $notchedOutline": {
                borderWidth: "2px",
                borderColor: THEME.palette.secondary.main
            }
        }
    },
    MuiFormLabel: {
        root: {
            "&$focused": {
                borderWidth: 1,
                borderColor: THEME.palette.secondary.main
            }
        }
    },
    MuiFormControlLabel: {
        root: {
            "& svg": {
                color: THEME.palette.primary.text
            },
            "& .Mui-checked": {
                "& svg": {
                    color: THEME.palette.primary.main
                }
            },
            "& span": {
                color: THEME.palette.primary.text
            }
        }
    }
};

// Create the jsHash instance

var SHA256 = new Hashes.SHA256();
var emptyStringHash = SHA256.hex("");