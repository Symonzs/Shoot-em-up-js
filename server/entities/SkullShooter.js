import { Motion } from "../utils/CoordCalculator.js";
import Entity from "./Entity.js";

import SkulllMissile from "./bullets/SkullMissile.js";

export default class SkullShooter extends Entity {
  constructor(speed, atkspeed, hp, x, y, movement) {
    super(speed, atkspeed, hp, "/images/ships/skull-1.png", x, y, movement);
    this.secondPhase = false;
    this.transition = false;
    setTimeout(() => {
      this.secondPhase = true;
      setTimeout(() => {
        this.transition = true;
      }, this.movement.transitionTime);
    }, this.movement.time);
    this.missileList = [];
    this.imageNumber = 1;
    this.changeImage(this.imageNumber);
    this.shooting = 1;
    this.isShooting = false;
    this.go = false;
    this.cool = false;
    this.score = 1000;
  }

  updateHitboxes() {
    switch (this.imageNumber) {
      case 1:
        this.hitboxCoordinates = {
          x: this.renderCoordinates.x,
          y: this.renderCoordinates.y + 15,
          width: this.renderCoordinates.width,
          height: this.renderCoordinates.height - 50,
        };
        break;
      case 2:
        this.hitboxCoordinates = {
          x: this.renderCoordinates.x,
          y: this.renderCoordinates.y + 15,
          width: this.renderCoordinates.width,
          height: this.renderCoordinates.height - 40,
        };
        break;
      case 3:
        this.hitboxCoordinates = {
          x: this.renderCoordinates.x,
          y: this.renderCoordinates.y + 15,
          width: this.renderCoordinates.width,
          height: this.renderCoordinates.height - 31,
        };
        break;
      case 4:
        this.hitboxCoordinates = {
          x: this.renderCoordinates.x,
          y: this.renderCoordinates.y + 15,
          width: this.renderCoordinates.width,
          height: this.renderCoordinates.height - 20,
        };
        break;
      default:
        this.hitboxCoordinates = {
          x: this.renderCoordinates.x,
          y: this.renderCoordinates.y,
          width: this.renderCoordinates.width,
          height: this.renderCoordinates.height,
        };
    }
  }

  move() {
    this.missileList = this.missileList.filter(
      (missile) =>
        missile.hitboxCoordinates.x > 0 &&
        missile.hitboxCoordinates.x < this.canvasWidth
    );
    Motion(this);

    this.updateHitboxes();
  }

  changeImage(imageID) {
    this.renderCoordinates.path = `/images/ships/skull-${imageID}.png`;
    this.updateHitboxes();
  }

  shoot(player) {
    if (this.go) {
      this.missileList.push(
        new SkulllMissile(
          Math.round(Math.random() * 20) + 5,
          Math.round(Math.random() * 20),
          3,
          this.renderCoordinates.x - 10,
          this.renderCoordinates.y + 80
        )
      );
    }
    if (!this.isShooting) {
      this.tickBeforeShooting++;
      if (this.tickBeforeShooting == this.atkspd) {
        this.tickBeforeShooting = 0;
        this.shooting++;
        this.incrementImage();
      }
      if (this.shooting == 4) {
        this.go = true;
        this.isShooting = true;
        if (!this.cool) {
          this.cool = true;

          setTimeout(() => {
            this.shooting = 0;
            this.isShooting = false;
            this.cool = false;
            this.go = false;
          }, 10000);
        }
      }
    }
  }

  incrementImage() {
    if (this.imageNumber > 3) {
      this.imageNumber = 1;
    } else {
      this.imageNumber++;
    }
    this.changeImage(this.imageNumber);

    return this.imageNumber === 5;
  }
}
