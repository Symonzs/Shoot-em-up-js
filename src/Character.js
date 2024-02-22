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
    this.maxSpeedX = this.maxSpeed;
    this.maxSpeedY = this.maxSpeed * (ratio * 1.45);
    canvase.addEventListener("mousemove", (event) => {
      if (event.offsetX != latestCursorX) {
        latestCursorX = event.offsetX;
      }
      if (event.offsetY != latestCursorY) {
        latestCursorY = event.offsetY;
      }
    });
  }

  resampleCanvas() {
    canvase.width = canvase.clientWidth;
    canvase.height = canvase.clientHeight;
  }

  move() {
    this.xSpeed = velocityX(calcDistance(this.x, this.latestCursorX));
    this.ySpeed = velocityY(calcDistance(this.y, this.latestCursorY));
    this.x += this.xSpeed + this.image.width / 2;
    this.y += this.ySpeed + this.image.height / 2;
  }

  velocityX(distance) {
    let negative = false;
    const speed = distance / time;
    if (speed < 0) {
      negative = true;
    }
    if (Math.abs(speed) + -0.5 < 0) {
      return 0;
    }
    if (Math.abs(speed) > maxSpeedX) {
      if (negative) {
        return -maxSpeedX;
      }
      return maxSpeedX;
    } else {
      return speed;
    }
  }

  velocityY(distance) {
    let negative = false;
    const speed = distance / time;
    if (speed < 0) {
      negative = true;
    }
    if (Math.abs(speed) + -0.5 < 0) {
      return 0;
    }
    if (Math.abs(speed) > maxSpeedY) {
      if (negative) {
        return -maxSpeedY;
      }
      return maxSpeedY;
    } else {
      return speed;
    }
  }

  render() {
    contexte.drawImage(this.image, this.x, this.y);
  }
}
