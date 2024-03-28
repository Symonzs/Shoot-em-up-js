import LinearMissile from "./LinearMissile.js";

export default class FriendlyBasicBullet extends LinearMissile {
  constructor(speedX, damage, x, y) {
    super(speedX, damage, x, y, "/images/bullets/friendlybasicbullet.png");
  }

  move() {
    this.renderCoordinates.x += this.speedX;
    this.updateHitboxes();
  }
}
