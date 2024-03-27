import Missiles from "./Missiles.js";

export default class DiagonalMissile extends Missiles {
  constructor(path, speedX, speedY, hp, x, y) {
    super(1, hp, path, x, y);
    this.speedX = speedX;
    this.speedY = speedY;
    this.canBeHurt = false;
  }

  move() {
    this.renderCoordinates.x -= this.speedX;
    this.renderCoordinates.y += this.speedY;
  }
}
