import Entity from "./Entity.js";
import { canvase } from "./main.js";
import { contexte } from "./main.js";

export default class Missile extends Entity {
  constructor(image, speed, spawnX, spawnY) {
    super(image, speed, spawnX, spawnY);
    this.x = spawnX;
    this.y = spawnY;
  }

  move() {
    this.x -= this.speed;
  }

  render() {
    contexte.drawImage(this.image, this.x, this.y);
  }
}
