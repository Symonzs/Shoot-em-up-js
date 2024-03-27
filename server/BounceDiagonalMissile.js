import DiagonalMissile from "./DiagonalMissile.js";

export default class BounceDiagonalMissile extends DiagonalMissile {
  constructor(image, speedX, speedY, hp, renderCoordinates) {
    super(image, speedX, speedY, hp, renderCoordinates);
    this.hp = hp;
    this.canBeHurt = false;
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
