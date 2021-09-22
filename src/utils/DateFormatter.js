function DateFormatter(str) {
  let date;

  if (typeof str.getMonth === "function") {
    date = new Date(str.toUTCString().replace("GMT", ""));
  } else if (str) {
    date = new Date(str.replace("GMT", ""));
  } else {
    date = new Date();
  }

  const dateFormatted = date.toLocaleDateString();
  const time = date.toLocaleTimeString();

  return dateFormatted + " " + time;
}
