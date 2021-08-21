function getApi(query, page) {
  return (
    API_URL +
    SEARCH_MOVIE +
    API_KEY_PARAM +
    QUERY_PARAM +
    query +
    (page ? PAGE_PARAM + page : "")
  );
}

function getApiMovie(id) {
  return API_URL + MOVIE_URL + id;
}

function getImage(size, path) {
  if (path === null) {
    return IMG_ERROR;
  }
  return IMG_URL + size + path;
}

function getMoviePage(id) {
  return MOVIE_URL + ID_PARAM + id;
}
