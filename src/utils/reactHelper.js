function makeClass(...classes) {
  return classes.join(" ");
}

function getYear(date) {
  if (date) {
    return date.split("-")[0];
  } else {
    return "N/A";
  }
}

function getCollection(collection) {
  if (collection) {
    return collection.name;
  } else {
  }
}

function getDuration(duration) {
  if (duration) {
    const m = duration % 60;
    const displayM = (m < 10 ? "0" : "") + m;
    return Math.floor(duration / 60) + "h" + displayM + "m";
  } else {
    return "N/A";
  }
}

function getGenre(genres) {
  if (genres) {
    return genres.map((genre) => genre.name).join(", ");
  } else {
    return "N/A";
  }
}

function getMoney(revenue) {
  if (revenue) {
    return ("" + revenue).replace(/\d(?=(?:\d{3})+$)/g, "$&.") + "$";
  } else {
    return "N/A";
  }
}
