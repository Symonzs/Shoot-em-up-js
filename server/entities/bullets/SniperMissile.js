import Missiles from "./Missiles.js";

export default class SniperMissile extends Missiles {
  constructor(speedX, damage, x, y, player) {
    if (player) {
<<<<<<< HEAD
      super(0, 0, damage, "/images/bullets/basicbullet.png", x, y);
      this.speedY = player.hitboxCoordinates.y - this.renderCoordinates.y;
      this.speedX = player.hitboxCoordinates.y;
=======
      super(speedX, 0, damage, "/images/bullets/basicbullet.png", x, y);
      this.time =
        (this.hitboxCoordinates.x - player.hitboxCoordinates.x) / speedX;

      this.speedY =
        (player.hitboxCoordinates.y - this.renderCoordinates.y) / this.time;
      console.log(player.hitboxCoordinates.y - this.renderCoordinates.y);
      console.log(this.time);
      console.log(this.speedY);
>>>>>>> afd3c936ba04f899012a360d303bd7922d0dea72
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
