import Missiles from "./Missiles.js";

export default class LinearMissile extends Missiles {
  constructor(speedX, damage, x, y, path) {
    if (path) {
      super(speedX, 0, damage, path, x, y);
    } else {
      super(speedX, 0, damage, "/images/bullets/basicbullet.png", x, y);
    }
  }

  move() {
    this.renderCoordinates.x -= this.speedX;
    this.updateHitboxes();
  }
}
