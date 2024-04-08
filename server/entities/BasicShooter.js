import Entity from "./Entity.js";
import LinearMissile from "./bullets/LinearMissile.js";
import { Motion } from "../utils/CoordCalculator.js";

export default class BasicShooter extends Entity {
  constructor(speed, atkspeed, hp, x, y, movement) {
    super(
      speed,
      atkspeed,
      hp,
      "/images/ships/basicshooter.png",
      x,
      y,
      movement
    );
    this.score = 100;
    this.isShooting = false;
    this.secondPhase = false;
    this.transition = false;
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
    if (this.tickBeforeShooting == this.atkspd) {
      this.missileList.push(
        new LinearMissile(
          10,
          2,
          this.renderCoordinates.x,
          this.renderCoordinates.y
        )
      );
      this.tickBeforeShooting = 0;
    }
  }

  move() {
    if (this.tickBeforeShooting < this.atkspd) {
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
