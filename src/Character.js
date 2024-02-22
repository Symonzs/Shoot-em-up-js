import Entity from "./Entity.js";
import { calcCoord } from "./coordCalculator.js";
import { calcDistance } from "./coordCalculator.js";
import { contexte } from "./main.js";
import { canvase } from "./main.js";

export default class Character extends Entity {
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
    this.ratio = canvase.width / canvase.height;
    this.maxSpeedY = this.maxSpeed;
    this.maxSpeedX = this.maxSpeed; //* (this.ratio * 1.25);
    canvase.addEventListener("mousemove", (event) => {
      if (event.offsetX != this.latestCursorX) {
        this.latestCursorX = event.offsetX;
      }
      if (event.offsetY != this.latestCursorY) {
        this.latestCursorY = event.offsetY;
      }
    });
  }

  resampleCanvas() {
    canvase.width = canvase.clientWidth;
    canvase.height = canvase.clientHeight;
  }

  

  velocityX(distance) {
    let negative = false;
    const speed = distance / this.time;
    if (speed < 0) {
      negative = true;
    }
    if (Math.abs(speed) + -0.5 < 0) {
      return 0;
    }
    if (Math.abs(speed) > this.maxSpeedX) {
      if (negative) {
        return -this.maxSpeedX;
      }
      return this.maxSpeedX;
    } else {
      return speed;
    }
  }

  velocityY(distance) {
    let negative = false;
    const speed = distance / this.time;
    if (speed < 0) {
      negative = true;
    }
    if (Math.abs(speed) + -0.5 < 0) {
      return 0;
    }
    if (Math.abs(speed) > this.maxSpeedY) {
      if (negative) {
        return -this.maxSpeedY;
      }
      return this.maxSpeedY;
    } else {
      return speed;
    }
  }

  move() {
    this.xSpeed = this.velocityX(calcDistance(this.x, this.latestCursorX));
    console.log("x " +this.x);
    console.log(this.latestCursorX);
   //console.log(calcDistance(this.x, this.latestCursorX));
    this.ySpeed = this.velocityY(calcDistance(this.y, this.latestCursorY));
    
    this.x -= this.xSpeed;
    this.y -= this.ySpeed;
    
  }

  render() {
    contexte.drawImage(this.image, this.x - (this.image.width / 2), this.y - (this.image.height / 2));
    
  }
}
