function getApi(query, page) {
  return API_URL + SEARCH_MOVIE + API_KEY_PARAM + QUERY_PARAM + query + (page ? PAGE_PARAM + page : "");
}

function getImage(size, path) {
  if (path === null) {
    return IMG_ERROR;
  }
  return IMG_URL + size + path;
}