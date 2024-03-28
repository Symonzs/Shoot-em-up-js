import Missiles from "./Missiles.js";

export default class DiagonalMissile extends Missiles {
  constructor(speedX, speedY, damage, x, y, path) {
    if (path) {
      super(speedX, speedY, damage, path, x, y);
    } else {
      super(
        speedX,
        speedY,
        damage,
        "client/public/images/bullets/basicbullet.png",
        x,
        y
      );
    }
  }

  move() {
    this.renderCoordinates.x -= this.speedX;
    this.renderCoordinates.y += this.speedY;
    this.updateHitboxes();
  }
}
