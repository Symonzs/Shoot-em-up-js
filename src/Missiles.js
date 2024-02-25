import Entity from "./Entity.js";

export default class Missiles extends Entity {
  constructor(image, speed,hp, spawnX, spawnY) {
    super(image, speed,hp, spawnX, spawnY);
    this.x = spawnX;
    this.y = spawnY;
    this.canBeHurt = false;
  }

}
