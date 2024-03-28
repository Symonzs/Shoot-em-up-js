import Missiles from "./Missiles.js";

export default class LaserMissile extends Missiles {
  constructor(path, speedX, speedY, damage, x, y) {
    super(speedX, speedY, damage, path, x, y);
  }

  move(X, Y) {
    if (X && Y) {
      this.renderCoordinates.x = X;
      this.renderCoordinates.y = Y;
    } else {
      return;
    }
  }
}
