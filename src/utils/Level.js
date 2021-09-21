function Level(xp) {
  this.xp = xp;
  this.floatLevel = Math.pow(xp, 1.1 / 2) / 3;
  this.level = Math.floor(this.floatLevel);
  this.progress = Math.floor((this.floatLevel - this.level) * 100);
}
