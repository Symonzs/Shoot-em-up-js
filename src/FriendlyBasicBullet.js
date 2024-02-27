import LinearMissile from "./LinearMissile.js";

export default class FriendlyBasicBullet extends LinearMissile {
  constructor(speed, hp, renderCoordinates) {
    super("/images/friendlybasicbullet.png", speed, hp, renderCoordinates);
  }
}