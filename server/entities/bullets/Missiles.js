import Entity from "../Entity.js";
import { getRenderValues } from "../../utils/getImageValues.js";

export default class Missiles {
  /*onstructor(speed, hp, path, x, y) {
    super(speed, hp, path, x, y);
    this.canBeHurt = false;
  }*/

  constructor(speedX, speedY, damage, path, x, y) {
    this.speedX = speedX;
    this.speedY = speedY;
    this.hitboxCoordinates = getRenderValues(path, x, y);
    this.renderCoordinates = getRenderValues(path, x, y);
    this.spawnX = this.hitboxCoordinates.x;
    this.spawnY = this.hitboxCoordinates.y;
    this.damage = damage;
    this.canBeHurt = false;
    this.canvasWidth = 1500;
    this.canvasHeight = 800;
  }

  updateHitboxes() {
    this.hitboxCoordinates = {
      x: this.renderCoordinates.x,
      y: this.renderCoordinates.y,
      width: this.renderCoordinates.width,
      height: this.renderCoordinates.height,
    };
  }
}
