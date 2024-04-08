import Missiles from "./Missiles.js";

export default class SkulllMissile extends Missiles {
  constructor(speedX, speedY, damage, x, y, path) {
    if (path) {
      super(speedX, speedY, damage, path, x, y);
    } else {
      super(
        speedX,
        speedY,
        damage,
        "/images/bullets/skull-projectile.png",
        x,
        y
      );
    }
  }

  move() {
    this.renderCoordinates.x -= this.speedX;
    this.renderCoordinates.y += this.speedY - Math.random() * (this.speedY * 2);
    this.updateHitboxes();
  }
}
