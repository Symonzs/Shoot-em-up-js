import Entity from "./Entity.js";
import { calcCoord, calcDistance, velocity } from "./coordCalculator.js";
import { contexte } from "./main.js";
import { canvase } from "./main.js";

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

  move() {
    this.xSpeed = velocity(calcDistance(this.x, this.latestCursorX), this.maxSpeedX, this.time);
    this.ySpeed = velocity(calcDistance(this.y, this.latestCursorY), this.maxSpeedY, this.time);
    
    this.x -= this.xSpeed;
    this.y -= this.ySpeed;
    
  }

  render() {
    contexte.drawImage(this.image, this.x - (this.image.width / 2), this.y - (this.image.height / 2));
    
  }
}
