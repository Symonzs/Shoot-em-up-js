import Missiles from "./Missiles.js";

export default class UpperCurvedMissile extends Missiles {
  constructor(image, speed,hp, renderCoordinates) {
    super(speed, hp, renderCoordinates);
    if (!image) {
      this.image = "/images/bullets/basicbullet.png";
    } else {
      this.image = image;
    }
    this.canBeHurt = false;
    this.amplitude = 100;//variation amx de la courbe en hauteur
    this.frequency = 0.005;//longueur de la courbe en largeur
    this.initialY = renderCoordinates.y;
  }

  move() {
    this.renderCoordinates.x -= this.speed;
    this.renderCoordinates.y = this.initialY - Math.sin(this.renderCoordinates.x * this.frequency) * this.amplitude;
}
}
