import FriendlyBasicBullet from "../entities/bullets/FriendlyBasicBullet.js";
import FriendlyPlasmaBullet from "../entities/bullets/FriendlyPlasmaBullet.js";
import Weapon from "./Weapon.js";

export default class BurstWeapon extends Weapon {
  constructor(speed, dmg, fireRate, burstInterval, missileNumber) {
    super(speed, dmg, fireRate);
    this.burstInterval = burstInterval;
    this.missileNumber = missileNumber;
  }

  shoot(renderCoordinates) {
    const x = renderCoordinates.x + renderCoordinates.width;
    const y = renderCoordinates.y + renderCoordinates.height / 2;

    return new FriendlyPlasmaBullet(this.speed, 1, x, y);
  }
}
