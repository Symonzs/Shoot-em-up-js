import FriendlyBasicBullet from "./FriendlyBasicBullet.js";

export default class Weapon {
  constructor(speed, dmg, fireRate, renderCoordinatesProj) {
    this.speed = speed;
    this.dmg = dmg;
    this.fireRate = fireRate;
    this.renderCoordinatesProj = renderCoordinatesProj;
  }

  shoot(renderCoordinates) {
    const newMissileRenderCoordinates = {
      x: renderCoordinates.x + renderCoordinates.width,
      y: renderCoordinates.y + renderCoordinates.height / 2,
      width: this.renderCoordinatesProj.width,
      height: this.renderCoordinatesProj.height,
    };

    return new FriendlyBasicBullet(this.speed, 1, newMissileRenderCoordinates);
  }
}
