import Entity from "./Entity.js";
import { calcCoord, calcDistance, velocity } from "./coordCalculator.js";

export default class Joueur extends Entity {
  constructor(image, speed, hp, renderCoordinates, hitboxCoordinates) {
    super(image, speed, hp, renderCoordinates, hitboxCoordinates);
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
    this.xSpeed = velocity(calcDistance(this.hitboxCoordinates.x+this.hitboxCoordinates.width/2, this.latestCursorX), this.maxSpeedX, this.time);
    this.ySpeed = velocity(calcDistance(this.hitboxCoordinates.y+this.hitboxCoordinates.height/2, this.latestCursorY), this.maxSpeedY, this.time);
    
    this.hitboxCoordinates.x -= this.xSpeed;
    this.hitboxCoordinates.y -= this.ySpeed;
    this.renderCoordinates.x -= this.xSpeed;
    this.renderCoordinates.y -= this.ySpeed;
  }

  hit(entity) {
    const hit = entity.hitboxCoordinates.x < this.hitboxCoordinates.x + this.hitboxCoordinates.width &&
    entity.hitboxCoordinates.x + entity.hitboxCoordinates.width > this.hitboxCoordinates.x &&
    entity.hitboxCoordinates.y < this.hitboxCoordinates.y + this.hitboxCoordinates.height &&
    entity.hitboxCoordinates.y + entity.hitboxCoordinates.height > this.hitboxCoordinates.y &&
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
