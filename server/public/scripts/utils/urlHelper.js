function makeParams() {
  for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  return "?" + params.filter(function (param) {
    return param !== "";
  }).join("&");
}

function goToUrl(url) {
  for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    params[_key2 - 1] = arguments[_key2];
  }

  window.location.href = url + makeParams.apply(undefined, params);
}

function getApi(query, page) {
  return API_URL + SEARCH_MOVIE + makeParams(API_KEY_PARAM, QUERY_PARAM + query, page ? PAGE_PARAM + page : "", LANGUAGE_PARAM + "fr-FR", REGION_PARAM + "FR");
}

function getApiMovie(id) {
  return API_URL + MOVIE_URL + "/" + id + makeParams(API_KEY_PARAM);
}

function getImage(size, path) {
  if (path === null || path === undefined) {
    return IMG_ERROR;
  }
  return IMG_URL + size + path;
}

function getMoviePage(id, query) {
  return MOVIE_URL + makeParams(ID_PARAM + id, QUERY_PARAM + query);
}

function getParam(splitter, param) {
  var urlArray = window.location.href.split(splitter);
  var urlParams = urlArray[urlArray.length - 1] || (urlArray.length >= 2 ? urlArray[urlArray.length - 2].replace("#", "") : "");
  return new URLSearchParams(urlParams).get(param);
}