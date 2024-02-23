import Entity from "./Entity.js";
import { canvase } from "./main.js";
import { contexte } from "./main.js";

export default class Missiles extends Entity {
  constructor(image, speed,hp, spawnX, spawnY) {
    super(image, speed,hp, spawnX, spawnY);
    this.x = spawnX;
    this.y = spawnY;
    this.canBeHurt = false;
  }

}
