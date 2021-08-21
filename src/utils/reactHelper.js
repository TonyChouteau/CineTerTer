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

function getDuration(duration) {
  if (duration) {
    const m = duration % 60;
    const displayM = (m < 10 ? "0" : "") + m;
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
