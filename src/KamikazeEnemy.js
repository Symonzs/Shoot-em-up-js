import Entity from "./Entity.js";



export default class KamikazeEnemy extends Entity {
  constructor(image, speed,hp, spawnX, spawnY) {
    super(image, speed,hp, spawnX, spawnY);
    this.x = spawnX;
    this.y = spawnY;
    this.missileList = [];
    this.angle = Math.random() * Math.PI * 0.25 - Math.PI * 0.125;
    this.speedX = Math.cos(this.angle) * speed;
    this.speedY = Math.sin(this.angle) * speed;
  }

  move() {
    this.x -= this.speedX;
    this.y += this.speedY;

   
    if (this.x < 0 || this.y > this.canvasHeight) {
      this.resetPosition();
    }
  }

  resetPosition() {
  
    this.x = this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.angle = Math.random() * Math.PI * 0.25 - Math.PI * 0.125; 
    this.speedX = Math.cos(this.angle) * this.speed;
    this.speedY = Math.sin(this.angle) * this.speed;
  }
}
