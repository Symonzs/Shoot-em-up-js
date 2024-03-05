import LinearMissile from "./LinearMissile.js";

export default class FriendlyBasicBullet extends LinearMissile {
  constructor(speed, hp, renderCoordinates) {
    super("/images/bullets/friendlybasicbullet.png", speed, hp, renderCoordinates);
  }

    move() {
        this.renderCoordinates.x += this.speed;
    }
}