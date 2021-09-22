function DateFormatter(str) {
  var date = void 0;

  if (typeof str.getMonth === "function") {
    date = new Date(str.toUTCString().replace("GMT", ""));
  } else if (str) {
    date = new Date(str.replace("GMT", ""));
  } else {
    date = new Date();
  }

  var dateFormatted = date.toLocaleDateString();
  var time = date.toLocaleTimeString();

  return dateFormatted + " " + time;
}