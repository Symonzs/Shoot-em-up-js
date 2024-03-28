import DiagonalMissile from "./DiagonalMissile.js";

export default class BounceDiagonalMissile extends DiagonalMissile {
  constructor(speedX, speedY, damage, x, y) {
    super(
      speedX,
      speedY,
      damage,
      x,
      y,
      "/images/bullets/bouncediagonalmissile.png"
    );
  }

  move() {
    this.renderCoordinates.x -= this.speedX;
    this.renderCoordinates.y += this.speedY;
    if (
      this.renderCoordinates.y <= 0 ||
      this.renderCoordinates.y + this.renderCoordinates.height >
        this.canvasHeight
    ) {
      this.speedY = -this.speedY;
    }
    this.updateHitboxes();
  }
}
