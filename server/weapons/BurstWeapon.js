import FriendlyBasicBullet from "../entities/bullets/FriendlyBasicBullet.js";
import FriendlyPlasmaBullet from "../entities/bullets/FriendlyPlasmaBullet.js";
import Weapon from "./Weapon.js";

export default class BurstWeapon extends Weapon {
  constructor(
    speed,
    dmg,
    fireRate,
    renderCoordinatesProj,
    burstInterval,
    missileNumber
  ) {
    super(speed, dmg, fireRate, renderCoordinatesProj);
    this.burstInterval = burstInterval;
    this.missileNumber = missileNumber;
  }

  shoot(renderCoordinates) {
    const newMissileRenderCoordinates = {
      x: renderCoordinates.x + renderCoordinates.width,
      y: renderCoordinates.y + renderCoordinates.height / 2,
      width: this.renderCoordinatesProj.width,
      height: this.renderCoordinatesProj.height,
    };

    return new FriendlyPlasmaBullet(this.speed, 1, newMissileRenderCoordinates);
  }
}
