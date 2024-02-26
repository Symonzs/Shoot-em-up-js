import Entity from "./Entity.js";



export default class KamikazeEnemy extends Entity {
  constructor(speed,hp, renderCoordinates) {
    super(speed,hp, renderCoordinates);
    this.image = "/images/Sprite-first.png";
    this.missileList = [];
    this.angle = Math.random() * Math.PI * 0.25 - Math.PI * 0.125;
    this.speedX = Math.cos(this.angle) * speed;
    this.speedY = Math.sin(this.angle) * speed;
  }

  move() {
    this.hitboxCoordinates.x -= this.speedX;
    this.hitboxCoordinates.y += this.speedY;
    this.renderCoordinates.x -= this.speedX;
    this.renderCoordinates.y += this.speedY;

   
    if (this.hitboxCoordinates.x < 0 || this.hitboxCoordinates.y > this.canvasHeight) {
      this.resetPosition();
    }
  }

  resetPosition() {
  
    this.hitboxCoordinates.x = this.canvasWidth;
    this.renderCoordinates.x = this.canvasWidth;
    const newY = Math.random() * this.canvasHeight;
    this.hitboxCoordinates.y = newY;
    this.renderCoordinates.y = newY;
    this.angle = Math.random() * Math.PI * 0.25 - Math.PI * 0.125; 
    this.speedX = Math.cos(this.angle) * this.speed;
    this.speedY = Math.sin(this.angle) * this.speed;
  }
}
