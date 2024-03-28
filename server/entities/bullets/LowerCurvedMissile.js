import Missiles from "./Missiles.js";

export default class LowerCurvedMissile extends Missiles {
  constructor(speedX, damage, x, y) {
    super(speedX, 0, damage, "/images/bullets/basicbullet.png", x, y);
    this.amplitude = 100; //variation amx de la courbe en hauteur
    this.frequency = 0.005; //longueur de la courbe en largeur
    this.initialY = y;
  }

  move() {
    this.renderCoordinates.x -= this.speedX;
    this.renderCoordinates.y =
      this.initialY +
      Math.sin(this.renderCoordinates.x * this.frequency) * this.amplitude;
    this.updateHitboxes();
    //this.renderCoordinatesy
  }
}
