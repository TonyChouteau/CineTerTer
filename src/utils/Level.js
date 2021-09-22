function Level(xp) {
  this.xp = xp;
  this.floatLevel = Math.pow(xp, Level.K) / 3;
  this.level = Math.floor(this.floatLevel);
  this.progress = Math.floor((this.floatLevel - this.level) * 100);
}

Level.K = 1.1 / 2;

Level.fromLevel = function (level) {
  return new Level(Math.pow(3 * level, 1 / Level.K));
};
