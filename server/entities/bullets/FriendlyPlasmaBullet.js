import DiagonalMissile from "./DiagonalMissile.js";
import LinearMissile from "./LinearMissile.js";

export default class FriendlyPlasmaBullet extends DiagonalMissile {
  constructor(speed, hp, x, y) {
    super(
      "/images/bullets/friendlyplasmabullet.png",
      speed,
      Math.random() * 6 - 3,
      hp,
      x,
      y
    );
    this.canBeHurt = false;
    this.VarProjX = 20;
    this.VarProjY = -10;
  }

  move() {
    this.renderCoordinates.x += this.speedX;
    this.renderCoordinates.y += this.speedY;
    this.updateHitboxes();
  }
}
