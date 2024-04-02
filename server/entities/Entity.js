import { getJSONValues, getRenderValues } from "../utils/getImageValues.js";

export default class Entity {
  constructor(speed, atkspd, hp, path, x, y, movement) {
    this.speed = speed;
    this.atkspd = atkspd;
    this.tickBeforeShooting = 0;
    this.movement = movement;
    this.hitboxCoordinates = getRenderValues(path, x, y);
    this.renderCoordinates = getRenderValues(path, x, y);
    this.spawnX = this.hitboxCoordinates.x;
    this.spawnY = this.hitboxCoordinates.y;
    this.hp = hp;
    this.canBeHurt = true;
    this.canvasWidth = 1580;
    this.canvasHeight = 880;
  }
}
