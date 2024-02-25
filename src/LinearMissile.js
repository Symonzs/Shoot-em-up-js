import Missiles from "./Missiles.js";

export default class LinearMissile extends Missiles {
  constructor(image, speed,hp, spawnX, spawnY) {
    super(image, speed, spawnX, spawnY);
    this.x = spawnX;
    this.y = spawnY;
    this.hp = hp;
    this.canBeHurt = false;
  }

  move() {
    this.x -= this.speed;
  }
}
