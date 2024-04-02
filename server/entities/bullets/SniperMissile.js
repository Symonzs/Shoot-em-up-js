import Missiles from "./Missiles.js";

export default class SniperMissile extends Missiles {
  constructor(speedX, damage, x, y, player) {
    if (player) {
      super(speedX, 0, damage, "/images/bullets/basicbullet.png", x, y);
      this.time =
        (this.hitboxCoordinates.x - player.hitboxCoordinates.x) / speedX;

      this.speedY =
        (player.hitboxCoordinates.y - this.renderCoordinates.y) / this.time;
    } else {
      super(speedX, 0, damage, "/images/bullets/basicbullet.png", x, y);
    }
    //this.speedY =
    //(player.hitboxCoordinates.y - this.renderCoordinates.y) / this.speedX;
  }

  move() {
    this.renderCoordinates.x -= this.speedX;
    this.renderCoordinates.y += this.speedY;
    this.updateHitboxes();
  }
}
