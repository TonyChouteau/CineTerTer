function makeClass() {
  for (
    var _len = arguments.length, classes = Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    classes[_key] = arguments[_key];
  }

  return classes.join(" ");
}

function getYear(date) {
  if (date) {
    return date.split("-")[0];
  } else {
    return "N/A";
  }
}

function getDuration(duration) {
  if (duration) {
    var m = duration % 60;
    var displayM = (m < 10 ? "0" : "") + m;
    return Math.floor(duration / 60) + "h" + displayM + "m";
  } else {
    return "N/A";
  }
}

function getRevenue(revenue) {
  console.log(revenue);
  if (revenue) {
    return ("" + revenue).replace(/\d(?=(?:\d{3})+$)/g, "$&.") + "$";
  } else {
    return "N/A";
  }
}
