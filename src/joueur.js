import Entity from "./Entity.js";
import { calcCoord, calcDistance, velocity } from "./coordCalculator.js";
import FriendlyBasicBullet from "./FriendlyBasicBullet.js";
import Weapon from "./Weapon.js";

export default class Joueur extends Entity {
  constructor(speed, hp, renderCoordinates, renderCoordinatesProj) {
    super(speed, hp, renderCoordinates);
    this.weapon = new Weapon(75, 1, 500, renderCoordinatesProj);
    this.image = "/images/ships/allyship.png";
    this.updateHitboxes();
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.latestCursorX = 0;
    this.latestCursorY = 0;
    this.time = 10;
    this.maxSpeed = 16;
    this.ratio = this.canvasWidth / this.canvasHeight;
    this.maxSpeedY = this.maxSpeed;
    this.maxSpeedX = this.maxSpeed; //* (this.ratio * 1.25);
    this.canBeTouched = true;
    this.varProjX = this.renderCoordinates.width;
    this.varProjY = 20;
    this.renderCoordinatesProj = renderCoordinatesProj;
    this.missileList = [];
  }

  updateHitboxes() {
    this.hitboxCoordinates = {
      x: this.renderCoordinates.x + 5,
      y: this.renderCoordinates.y + 15,
      width: this.renderCoordinates.width - 5,
      height: this.renderCoordinates.height - 15,
    };
  }

  shoot() {
    /*const newMissileRenderCoordinates = {
      x: this.renderCoordinates.x + this.varProjX,
      y: this.renderCoordinates.y + this.varProjY,
      width: this.renderCoordinatesProj.width,
      height: this.renderCoordinatesProj.height,
    };
    this.missileList.push(
      new FriendlyBasicBullet(75, 999, newMissileRenderCoordinates)
    );*/
    this.missileList.push(this.weapon.shoot(this.renderCoordinates));
  }

  changeWeapon(weapon) {
    this.weapon = weapon;
  }

  move() {
    this.missileList = this.missileList.filter(
      (missile) =>
        missile.hitboxCoordinates.x > 0 &&
        missile.hitboxCoordinates.x < this.canvasWidth
    );
    this.missileList.forEach((missile) => missile.move());
    this.xSpeed = velocity(
      calcDistance(
        this.renderCoordinates.x + this.renderCoordinates.width / 2,
        this.latestCursorX
      ),
      this.maxSpeedX,
      this.time
    );
    this.ySpeed = velocity(
      calcDistance(
        this.renderCoordinates.y + this.renderCoordinates.height / 2,
        this.latestCursorY
      ),
      this.maxSpeedY,
      this.time
    );
    this.renderCoordinates.x -= this.xSpeed;
    this.renderCoordinates.y -= this.ySpeed;

    this.updateHitboxes();
  }
}
