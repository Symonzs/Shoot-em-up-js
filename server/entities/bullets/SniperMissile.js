import Missiles from "./Missiles.js";

export default class SniperMissile extends Missiles {
  constructor(speedX, damage, x, y, player) {
    console.log(player);
    if (player) {
      super(speedX, 0, damage, "/images/bullets/basicbullet.png", x, y);
      this.speedY =
        (player.hitboxCoordinates.y - this.renderCoordinates.y) /
        this.speedX /
        2;
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
