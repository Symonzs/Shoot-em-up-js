import Entity from "./Entity.js";
import { canvase } from "./main.js";
import { contexte } from "./main.js";

export default class Joueur extends Entity {
  constructor(image, speed, spawnX, spawnY) {
    super(image, speed, spawnX, spawnY);
    this.x = spawnX;
    this.y = spawnY;
  }

  move() {
    if (this.y + this.image.height > canvase.height) {
      //this.y = canvase.height - this.image.height;
      this.speed = -this.speed;
    }
    if (this.y < 0) {
      this.speed = Math.abs(this.speed);
    }

    this.y += this.speed;
  }

  render() {
    this.move();
    contexte.drawImage(this.image, this.x, this.y);
  }
}
