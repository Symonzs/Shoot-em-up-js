import Entity from "./Entity.js";
import { canvase } from "./main.js";
import { contexte } from "./main.js";

export default class KamikazeEnemy extends Entity {
  constructor(image, speed, spawnX, spawnY) {
    super(image, speed, spawnX, spawnY);
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

   
    if (this.x < 0 || this.y > canvase.height) {
      this.resetPosition();
    }
  }

  resetPosition() {
  
    this.x = canvase.width;
    this.y = Math.random() * canvase.height;
    this.angle = Math.random() * Math.PI * 0.25 - Math.PI * 0.125; 
    this.speedX = Math.cos(this.angle) * this.speed;
    this.speedY = Math.sin(this.angle) * this.speed;
  }

  render() {
    contexte.drawImage(this.image, this.x, this.y);
  }
}
