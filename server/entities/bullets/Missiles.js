import Entity from "../Entity.js";
import { getRenderValues } from "../../utils/getImageValues.js";

export default class Missiles {
  /*onstructor(speed, hp, path, x, y) {
    super(speed, hp, path, x, y);
    this.canBeHurt = false;
  }*/

  constructor(speed, damage, path, x, y) {
    this.speed = speed;
    this.hitboxCoordinates = getRenderValues(path, x, y);
    this.renderCoordinates = getRenderValues(path, x, y);
    this.spawnX = this.hitboxCoordinates.x;
    this.spawnY = this.hitboxCoordinates.y;
    this.damage = damage;
    this.canBeHurt = false;
    this.canvasWidth = 1920;
    this.canvasHeight = 1000;
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
