String.prototype.format = function () {
  a = this;
  for (k in arguments) {
    a = a.replaceAll("{" + k + "}", arguments[k]);
  }
  return a;
};

Array.prototype.sortBy = function (param) {
  return this.sort((a, b) => b[param] - a[param]);
};
