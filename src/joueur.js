import Entity from "./Entity.js";
import { calcCoord, calcDistance, velocity } from "./coordCalculator.js";

export default class Joueur extends Entity {
  constructor(image, speed, hp, spawnX, spawnY) {
    super(image, speed, hp, spawnX, spawnY);
    this.x = spawnX;
    this.y = spawnY;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.latestCursorX = 0;
    this.latestCursorY = 0;
    this.time = 10;
    this.maxSpeed = 13;
    this.ratio = this.canvasWidth / this.canvasHeight;
    this.maxSpeedY = this.maxSpeed;
    this.maxSpeedX = this.maxSpeed; //* (this.ratio * 1.25);
    this.canBeTouched = true;
  }
 
  move() {
    this.xSpeed = velocity(calcDistance(this.x, this.latestCursorX), this.maxSpeedX, this.time);
    this.ySpeed = velocity(calcDistance(this.y, this.latestCursorY), this.maxSpeedY, this.time);
    
    this.x -= this.xSpeed;
    this.y -= this.ySpeed;
  }

  hit(entity) {
    const hit = entity.x < this.x + this.image.width &&
    entity.x + entity.image.width > this.x &&
    entity.y < this.y + this.image.height &&
    entity.y + entity.image.height > this.y &&
    this.canBeTouched;
    if (hit) {
      this.hp -= 1;
      console.log(`hp: ${this.hp}`);
      this.canBeTouched = false;
      setTimeout(() => {
        this.canBeTouched = true;
      }, 500);
    }
    return hit;
  }
}
