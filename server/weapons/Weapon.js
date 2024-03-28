import FriendlyBasicBullet from "../entities/bullets/FriendlyBasicBullet.js";

export default class Weapon {
  constructor(speed, dmg, fireRate, renderCoordinatesProj) {
    this.speed = speed;
    this.dmg = dmg;
    this.fireRate = fireRate;
    this.renderCoordinatesProj = renderCoordinatesProj;
  }

  shoot(renderCoordinates) {
    const x = renderCoordinates.x + 35;
    const y = renderCoordinates.y + 20;
    return new FriendlyBasicBullet(this.speed, 1, x, y);
  }
}
