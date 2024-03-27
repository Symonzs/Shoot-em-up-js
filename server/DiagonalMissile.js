import Missiles from "./Missiles.js";

export default class DiagonalMissile extends Missiles {
  constructor(image, speedX, speedY, hp, renderCoordinates) {
    super(0, hp, renderCoordinates);
    this.image = image;
    this.speedX = speedX;
    this.speedY = speedY;
    this.canBeHurt = false;
  }

  move() {
    this.renderCoordinates.x -= this.speedX;
    this.renderCoordinates.y += this.speedY;
   
  }
}
