import DiagonalMissile from "./DiagonalMissile.js";


export default class BounceDiagonalMissile extends DiagonalMissile {
  constructor(image, speedX, speedY, hp, spawnX, spawnY) {
    super(image,speedX,speedY, hp, spawnX, spawnY);
    this.x = spawnX;
    this.y = spawnY;
    this.hp = hp;
    this.canBeHurt = false;
  }

  move() {
    this.x -= this.speedX;
    this.y += this.speedY;
    if (this.y <= 0 || this.y >= this.canvasWidth - this.canvasHeight) {
        this.speedY = -this.speedY;
      }
  }
}
