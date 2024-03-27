import Entity from "../Entity.js";

export default class Missiles extends Entity {
  constructor(speed, hp, path, x, y) {
    super(speed, hp, path, x, y);
    this.canBeHurt = false;
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
