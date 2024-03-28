import DiagonalMissile from "./DiagonalMissile.js";
import LinearMissile from "./LinearMissile.js";

export default class FriendlyPlasmaBullet extends DiagonalMissile {
  constructor(speedX, damage, x, y) {
    super(
      speedX,
      Math.random() * 6 - 3,
      damage,
      x,
      y,
      "/images/bullets/friendlyplasmabullet.png"
    );
  }

  move() {
    this.renderCoordinates.x += this.speedX;
    this.renderCoordinates.y += this.speedY;
    this.updateHitboxes();
  }
}
