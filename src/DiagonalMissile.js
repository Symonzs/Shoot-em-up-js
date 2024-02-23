import Missiles from "./Missiles.js";
import { canvase, contexte } from "./main.js";

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
    if (this.y <= 0 || this.y >= canvase.height - this.image.height) {
        this.speedY = -this.speedY;
      }
  }

  render() {
    contexte.drawImage(this.image, this.x, this.y);
  }
}
