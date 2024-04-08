import Entity from "./Entity.js";

export default class KamikazeEnemy extends Entity {
  constructor(speed, x, y) {
    super(speed, -1, 999, "/images/ships/shark.png", x, y);
    this.missileList = [];
    this.angle = Math.random() * Math.PI * 0.25 - Math.PI * 0.125;
    this.dmg = 2;
    this.speedX = Math.cos(this.angle) * speed;
    this.speedY = Math.sin(this.angle) * speed;
  }

  move() {
    this.renderCoordinates.x -= this.speedX;
    this.renderCoordinates.y += this.speedY;
    if (
      this.renderCoordinates.x < 0 ||
      this.renderCoordinates.y > this.canvasHeight
    ) {
      this.resetPosition();
    }
  }

  resetPosition() {
    this.renderCoordinates.x = this.canvasWidth;
    const newY = Math.random() * this.canvasHeight;
    this.renderCoordinates.y = newY;
    this.angle = Math.random() * Math.PI * 0.25 - Math.PI * 0.125;
    this.speedX = Math.cos(this.angle) * this.speed;
    this.speedY = Math.sin(this.angle) * this.speed;
  }

  shoot() {}
}
