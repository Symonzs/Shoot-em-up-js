import Entity from "./Entity.js";
import LowerCurvedMissile from "./bullets/LowerCurvedMissile.js";
import UpperCurvedMissile from "./bullets/UpperCurvedMissile.js";
import { Motion } from "../utils/CoordCalculator.js";
import { getRenderValues, getJSONValues } from "../utils/GetImageValues.js";

export default class CurvedShooter extends Entity {
  constructor(speed, atkspeed, hp, x, y, movement) {
    super(speed, atkspeed, hp, "/images/ships/chadShooter.png", x, y, movement);
    this.score = 500;
    this.isShooting = false;
    this.secondPhase = false;
    this.transition = false;
    /*setInterval(() => {
      this.secondPhase = true;
      setInterval(() => {
        this.transition = true;
      }, this.movement.transitionTime);
    }, this.movement.time);*/

    this.missileList = [];
  }

  shoot() {
    if (this.tickBeforeShooting < this.atkspd) {
      return;
    }
    if (this.tickBeforeShooting == this.atkspd) {
      this.tickBeforeShooting = 0;
      this.isShooting = true;
      for (let i = 0; i < 200; i++) {
        setTimeout(() => {
          this.missileList.push(
            new UpperCurvedMissile(
              10,
              2,
              this.renderCoordinates.x,
              this.renderCoordinates.y
            )
          );
          this.missileList.push(
            new LowerCurvedMissile(
              10,
              2,
              this.renderCoordinates.x,
              this.renderCoordinates.y
            )
          );
          if (i == 199) {
            this.isShooting = false;
          }
        }, 200 * i);
      }
    }
  }

  updateHitboxes() {
    this.hitboxCoordinates = {
      x: this.renderCoordinates.x,
      y: this.renderCoordinates.y,
      width: this.renderCoordinates.width,
      height: this.renderCoordinates.height,
    };
  }

  move() {
    if (!this.isShooting) {
      this.tickBeforeShooting++;
    }

    this.missileList = this.missileList.filter(
      (missile) =>
        missile.hitboxCoordinates.x > 0 &&
        missile.hitboxCoordinates.x < this.canvasWidth
    );
    //this.missileList.forEach((missile) => missile.move());
    Motion(this);

    this.updateHitboxes();
  }
}
