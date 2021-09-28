// Base Api Urls

const API_BASE_URL = "/api";

//==================
// The Movie DB
//==================

const THE_MOVIE_DB_BASE_URL = API_BASE_URL + "/themoviedb";

const API_URL = THE_MOVIE_DB_BASE_URL + "/data";
const SEARCH_MOVIE = "/search/movie";

const IMG_URL = THE_MOVIE_DB_BASE_URL + "/image";
const SIZE_w500 = "/w500";
const SIZE_original = "/original";

// API Params

const API_KEY_PARAM = "api_key=API_KEY";
const QUERY_PARAM = "query=";
const LANGUAGE_PARAM = "language=";
const REGION_PARAM = "region=";

const PAGE_PARAM = "page=";

//==================
// Pages
//==================

const MOVIE_PAGE_URL = "/movie/";

const LOGIN_PAGE_URL = "/login";
const USER_PAGE_URL = "/user";
const USERS_PAGE_URL = "/users";

const ID_PARAM = "id=";

//==================
// Api Urls
//==================

const LOCAL_IMG_URL = API_BASE_URL + "/images";
const AVATAR_URL = LOCAL_IMG_URL + "/avatar";
const IMAGE_PNG = ".png";

const USERS_URL = API_BASE_URL + "/users";
const USER_URL = API_BASE_URL + "/user";
const REVIEWS_URL = API_BASE_URL + "/reviews";

const IMG_ERROR = "resources/images/error.png";

// Theme

const THEME = {
    palette: {
        primary: {
            main: "#5970f3",
            background: "#333",
            text: "#fff",
            border: "#fff",
            borderHover: "#ccc",
        },
        secondary: {
            main: "#3a50cf",
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

THEME["overrides"] = {
    MuiOutlinedInput: {
        root: {
            position: "relative",
            "& $notchedOutline": {
                borderWidth: "2px",
                borderColor: THEME.palette.primary.border,
            },
            "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
                borderWidth: "2px",
                borderColor: THEME.palette.primary.borderHover,
                // Reset on touch devices, it doesn't add specificity
                "@media (hover: none)": {
                    borderWidth: "2px",
                    borderColor: THEME.palette.primary.border,
                },
            },
            "&$focused $notchedOutline": {
                borderWidth: "2px",
                borderColor: THEME.palette.secondary.main,
            },
        },
    },
    MuiFormLabel: {
        root: {
            "&$focused": {
                borderWidth: 1,
                borderColor: THEME.palette.secondary.main,
            },
        },
    },
    MuiFormControlLabel: {
        root: {
            "& svg": {
                color: THEME.palette.primary.text,
            },
            "& .Mui-checked": {
                "& svg": {
                    color: THEME.palette.primary.main,
                },
            },
            "& span": {
                color: THEME.palette.primary.text,
            },
        },
    },
};

// Create the jsHash instance

const SHA256 = new Hashes.SHA256();
const emptyStringHash = SHA256.hex("");
