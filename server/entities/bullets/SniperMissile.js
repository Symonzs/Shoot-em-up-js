import Missiles from "./Missiles.js";

export default class SniperMissile extends Missiles {
  constructor(speedX, damage, x, y,player) { 
    super(speedX, (player.hitboxCoordinates.y-this.renderCoordinates.y)/this.speedX, damage, "/images/bullets/basicbullet.png", x, y);
  }
  
  move() {
    this.renderCoordinates.x -= this.speedX;
    this.renderCoordinates.y += this.speedY;
    this.updateHitboxes();
  }
}
