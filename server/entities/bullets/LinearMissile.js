import Missiles from "./Missiles.js";

export default class LinearMissile extends Missiles {
  constructor(path, speed, hp, x, y) {
    super(speed, hp, path, x, y);
    this.canBeHurt = false;
  }

  move(X, Y) {
    if (X && Y) {
      if (this.renderCoordinates.x > X - 300) {
        this.renderCoordinates.x -= this.speed;
      }
    } else {
      this.renderCoordinates.x -= this.speed;
    }
  }
}
