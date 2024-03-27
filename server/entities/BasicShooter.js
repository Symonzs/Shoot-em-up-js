import BounceDiagonalMissile from "./bullets/BounceDiagonalMissile.js";
import DiagonalMissile from "./bullets/DiagonalMissile.js";
import Entity from "./Entity.js";
import LinearMissile from "./bullets/LinearMissile.js";
import { Motion } from "../coordCalculator.js";
import { getJSONValues, getRenderValues } from "../utils/getImageValues.js";

export default class BasicShooter extends Entity {
  constructor(speed, hp, path, x, y, projPath, movement) {
    super(speed, hp, path, x, y, movement);
    this.renderCoordinatesProj = getRenderValues(projPath, x, y);
    this.hitboxCoordinatesProj = getJSONValues(projPath, 0, 0);
    this.secondPhase = false;
    this.transition = false;
    setTimeout(() => {
      this.secondPhase = true;
      setTimeout(() => {
        this.transition = true;
      }, this.movement.transitionTime);
    }, this.movement.time);
    this.missileList = [];
    this.image = path;
    this.imagebullet = projPath;
    this.updateHitboxes();

    this.varProjX = -20;
    this.varProjY = 35;

    /*
    this.canFire = setInterval(() => {
      this.shoot();
    }, 1000);
    */
  }

  updateHitboxes() {
    this.hitboxCoordinates = {
      x: this.renderCoordinates.x,
      y: this.renderCoordinates.y,
      width: this.renderCoordinates.width,
      height: this.renderCoordinates.height,
    };
  }

  shoot() {
    const newMissileRenderCoordinates = {
      x: this.renderCoordinates.x + this.varProjX,
      y: this.renderCoordinates.y + this.varProjY,
      width: this.renderCoordinatesProj.width,
      height: this.renderCoordinatesProj.height,
    };
    this.missileList.push(
      new LinearMissile(this.imagebullet, 10, 999, newMissileRenderCoordinates)
    );
  }

  move() {
    this.missileList = this.missileList.filter(
      (missile) =>
        missile.hitboxCoordinates.x > 0 &&
        missile.hitboxCoordinates.x < this.canvasWidth
    );
    this.missileList.forEach((missile) => missile.move());
    Motion(this);

    this.updateHitboxes();
  }
}
