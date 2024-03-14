import Entity from "./Entity.js";

export default class Missiles extends Entity {
  constructor(speed,hp, renderCoordinates, hitboxCoordinates) {
    super(speed,hp, renderCoordinates, hitboxCoordinates);
    this.canBeHurt = false;
  }

  updateHitboxes() {
    this.hitboxCoordinates = {
      "x": this.renderCoordinates.x,
      "y": this.renderCoordinates.y,
      "width": this.renderCoordinates.width,
      "height": this.renderCoordinates.height
    }
  }

}
