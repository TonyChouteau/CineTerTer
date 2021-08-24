function makeParams(...params) {
  return "?" + params.filter((param) => param !== "").join("&");
}

function goToUrl(url, ...params) {
  window.location.href = url + makeParams(...params);
}

function getCurrentUrl() {
  return window.location.href;
}

function getLangParam(lang) {
  if (lang) {
    return (
      LANGUAGE_PARAM +
      lang +
      "-" +
      lang.toUpperCase() +
      "&" +
      REGION_PARAM +
      lang.toUpperCase()
    );
  } else {
    return "";
  }
}

function getApi(query, page, lang) {
  return (
    API_URL +
    SEARCH_MOVIE +
    makeParams(
      API_KEY_PARAM,
      QUERY_PARAM + query,
      page ? PAGE_PARAM + page : "",
      getLangParam(lang)
    )
  );
}

function getApiMovie(id, lang) {
  return (
    API_URL +
    MOVIE_URL +
    "/" +
    id +
    makeParams(
      API_KEY_PARAM,
      getLangParam(lang),
      "append_to_response=" + "credits"
    )
  );
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

function getLoginUrl() {
  return API_BASE_URL + LOGIN_URL;
}
