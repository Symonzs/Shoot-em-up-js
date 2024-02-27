import Entity from "./Entity.js";
import { calcCoord, calcDistance, velocity } from "./coordCalculator.js";
import LinearMissile from "./LinearMissile.js";

export default class Joueur extends Entity {
  constructor(speed, hp, renderCoordinates, renderCoordinatesProj) {
    super(speed, hp, renderCoordinates);
    this.image = "/images/gentil.png";
    this.updateHitboxes(); 
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
    this.varProjX = 0;
    this.varProjY = 0;
    this.renderCoordinatesProj = renderCoordinatesProj;
    this.missileList = [];
  }
 
  updateHitboxes() {
    this.hitboxCoordinates = {
      "x": this.renderCoordinates.x+5,
      "y": this.renderCoordinates.y+15,
      "width": this.renderCoordinates.width-5,
      "height": this.renderCoordinates.height-15
    }
  }

  shoot() {
    const newMissileRenderCoordinates = {
      "x": this.renderCoordinates.x + this.varProjX,
      "y": this.renderCoordinates.y + this.varProjY,
      "width": 25,
      "height": 25
    }
    this.missileList.push(new LinearMissile("/images/basicbullet.png", 10, 999, newMissileRenderCoordinates));
  }

  move() {
    this.missileList = this.missileList.filter(
      (missile) => missile.hitboxCoordinates.x > 0 && missile.hitboxCoordinates.x < this.canvasWidth
    );
    console.log(this.missileList);
    this.xSpeed = velocity(calcDistance(this.renderCoordinates.x+this.renderCoordinates.width/2, this.latestCursorX), this.maxSpeedX, this.time);
    this.ySpeed = velocity(calcDistance(this.renderCoordinates.y+this.renderCoordinates.height/2, this.latestCursorY), this.maxSpeedY, this.time);
    this.renderCoordinates.x -= this.xSpeed;
    this.renderCoordinates.y -= this.ySpeed;

    this.updateHitboxes();
  }

  hit(entity) {
    const hit = entity.hitboxCoordinates.x < this.hitboxCoordinates.x + this.hitboxCoordinates.width &&
    entity.hitboxCoordinates.x + entity.hitboxCoordinates.width > this.hitboxCoordinates.x &&
    entity.hitboxCoordinates.y < this.hitboxCoordinates.y + this.hitboxCoordinates.height &&
    entity.hitboxCoordinates.y + entity.hitboxCoordinates.height > this.hitboxCoordinates.y &&
    this.canBeTouched;
    if (hit) {
      this.hp -= 1;
      this.canBeTouched = false;
      setTimeout(() => {
        this.canBeTouched = true;
      }, 500);
    }
    return hit;
  }
}
