import Missiles from "./Missiles.js";

export default class DiagonalMissile extends Missiles {
  constructor(image, speedX, speedY, hp, spawnX, spawnY) {
    super(image, hp, spawnX, spawnY);
    this.speedX = speedX;
    this.speedY = speedY;
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
