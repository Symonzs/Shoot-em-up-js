import FriendlyBasicBullet from "../entities/bullets/FriendlyBasicBullet.js";

export default class Weapon {
  constructor(speed, dmg, fireRate) {
    this.speed = speed;
    this.dmg = dmg;
    this.fireRate = fireRate;
  }

  shoot(renderCoordinates) {
    const x = renderCoordinates.x + 35;
    const y = renderCoordinates.y + 20;
    return new FriendlyBasicBullet(this.speed, this.dmg, x, y);
  }
}
