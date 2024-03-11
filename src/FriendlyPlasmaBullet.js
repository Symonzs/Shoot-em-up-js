import DiagonalMissile from "./DiagonalMissile.js";
import LinearMissile from "./LinearMissile.js";

export default class FriendlyPlasmaBullet extends DiagonalMissile {
  constructor(speed, hp, renderCoordinates) {
    super(
      "/images/bullets/friendlyplasmabullet.png",
      speed,
      Math.random() * 10 - 5,
      hp,
      renderCoordinates
    );

    this.canBeHurt = false;
    this.VarProjX = 20;
    this.VarProjY = -10;
  }

  move() {
    this.renderCoordinates.x += this.speedX;
  }
}
