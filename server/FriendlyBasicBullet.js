import LinearMissile from "./LinearMissile.js";

export default class FriendlyBasicBullet extends LinearMissile {
  constructor(speed, hp, renderCoordinates) {
    super(
      "/images/bullets/friendlybasicbullet.png",
      speed,
      hp,
      renderCoordinates
    );
    this.canBeHurt = false;
    this.VarProjX = 20;
    this.VarProjY = -10;
  }

  move() {
    this.renderCoordinates.x += this.speed;
  }
}
