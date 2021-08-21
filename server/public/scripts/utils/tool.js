String.prototype.format = function () {
  a = this;
  for (k in arguments) {
    a = a.replaceAll("{" + k + "}", arguments[k]);
  }
  return a;
};

Array.prototype.sortBy = function (param) {
  return this.sort(function (a, b) {
    return b[param] - a[param];
  });
};