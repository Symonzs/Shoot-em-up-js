import Missiles from "./Missiles.js";

export default class LowerCurvedMissile extends Missiles {
  constructor(speed, damage, renderCoordinates) {
    super(
      speed,
      damage,
      "/images/bullets/basicbullet.png",
      renderCoordinates.x,
      renderCoordinates.y
    );
    this.canBeHurt = false;
    this.amplitude = 100; //variation amx de la courbe en hauteur
    this.frequency = 0.005; //longueur de la courbe en largeur
    this.initialY = renderCoordinates.y;
  }

  move() {
    this.renderCoordinates.x -= this.speed;
    this.renderCoordinates.y =
      this.initialY +
      Math.sin(this.renderCoordinates.x * this.frequency) * this.amplitude;
    this.updateHitboxes();
    //this.renderCoordinatesy
  }
}
