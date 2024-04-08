import Entity from "./Entity.js";
import LinearMissile from "./bullets/LinearMissile.js";
import { Motion } from "../utils/CoordCalculator.js";
import HomingMissile from "./bullets/HomingMissile.js";

export default class homingShooter extends Entity {
  constructor(speed, atkspeed, hp, x, y, movement) {
    super(
      speed,
      atkspeed,
      hp,
      "/images/ships/homingShooter.png",
      x,
      y,
      movement
    );
    this.isShooting = false;
    this.secondPhase = false;
    this.transition = false;
    this.timeBeforeDisappear = Math.floor(Math.random() * 180) + 240;
    this.tickWhileShooting = 0;
    this.score = 500;
    setTimeout(() => {
      this.secondPhase = true;
      setTimeout(() => {
        this.transition = true;
      }, this.movement.transitionTime);
    }, this.movement.time);
    this.missileList = [];
  }

  updateHitboxes() {
    this.hitboxCoordinates = {
      x: this.renderCoordinates.x,
      y: this.renderCoordinates.y,
      width: this.renderCoordinates.width,
      height: this.renderCoordinates.height,
    };
  }

  shoot(player) {
    if (this.missileList.length > 0) {
      this.tickWhileShooting++;
      if (this.tickWhileShooting == this.timeBeforeDisappear) {
        this.missileList = [];
        this.tickWhileShooting = 0;
      }
    }
    if (!this.missileList.length > 0) {
      this.tickBeforeShooting++;
      if (this.tickBeforeShooting == this.atkspd) {
        this.missileList.push(
          new HomingMissile(
            10,
            2,
            this.renderCoordinates.x,
            this.renderCoordinates.y,
            player
          )
        );
        this.tickBeforeShooting = 0;
      }
    }
  }

  move() {
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
