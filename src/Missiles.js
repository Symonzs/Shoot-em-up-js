import Entity from "./Entity.js";

export default class Missiles extends Entity {
  constructor(speed,hp, renderCoordinates, hitboxCoordinates) {
    super(speed,hp, renderCoordinates, hitboxCoordinates);
    this.canBeHurt = false;
  }

}
