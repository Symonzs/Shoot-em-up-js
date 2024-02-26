import Entity from "./Entity.js";

export default class Missiles extends Entity {
  constructor(image, speed,hp, renderCoordinates, hitboxCoordinates) {
    super(image, speed,hp, renderCoordinates, hitboxCoordinates);
    this.canBeHurt = false;
  }

}
