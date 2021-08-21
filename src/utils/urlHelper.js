function makeParams(...params) {
  return "?" + params.filter((param) => param !== "").join("&");
}

function goToUrl(url, ...params) {
  window.location.href = url + makeParams(...params);
}

function getApi(query, page) {
  return (
    API_URL +
    SEARCH_MOVIE +
    makeParams(
      API_KEY_PARAM,
      QUERY_PARAM + query,
      page ? PAGE_PARAM + page : "",
      LANGUAGE_PARAM + "fr-FR",
      REGION_PARAM + "FR"
    )
  );
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
  const urlArray = window.location.href.split(splitter);
  const urlParams =
    urlArray[urlArray.length - 1] ||
    (urlArray.length >= 2
      ? urlArray[urlArray.length - 2].replace("#", "")
      : "");
      
  return new URLSearchParams(urlParams).get(param);
}
