import Entity from "./Entity.js";
import { calcCoord, calcDistance, velocity } from "../utils/CoordCalculator.js";
import Weapon from "../weapons/Weapon.js";
import BurstWeapon from "../weapons/BurstWeapon.js";
import { getRenderValues } from "../utils/GetImageValues.js";

const x = 500;
const y = 500;
const hp = 10;
const weapons = [];

export default class Joueur extends Entity {
  constructor(id, pseudo) {
    super(5, 9999, hp, "/images/ships/allyship.png", 0, y);
    if (id) {
      this.id = id;
    } else {
      this.id = Math.random() * 1000;
    }
    this.pseudo = pseudo;
    weapons.push(new Weapon(75, 3, 100, this.renderCoordinatesProj));
    weapons.push(
      new BurstWeapon(10, 1, 3000, this.renderCoordinatesProj, 80, 5)
    );
    this.weaponIndex = 0;
    this.weapon = weapons[this.weaponIndex];
    this.atkspd = this.weapon.fireRate;
    this.updateHitboxes();
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.canFire = false;
    this.latestCursorX = x;
    this.latestCursorY = y;
    this.time = 10;
    this.maxSpeed = 16;
    this.hasShooted = false;
    this.ratio = this.canvasWidth / this.canvasHeight;
    this.maxSpeedY = this.maxSpeed;
    this.maxSpeedX = this.maxSpeed; //* (this.ratio * 1.25);
    this.canBeTouched = true;
    this.varProjX = this.renderCoordinates.width;
    this.varProjY = 20;
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
    if (this.weapon.missileNumber && !this.hasShooted) {
      this.hasShooted = true;
      for (let i = 0; i < this.weapon.missileNumber; i++) {
        setTimeout(() => {
          this.missileList.push(this.weapon.shoot(this.renderCoordinates));
        }, this.weapon.burstInterval * i);
      }
      setTimeout(() => {
        this.hasShooted = false;
      }, this.weapon.fireRate);
    } else {
      if (!this.hasShooted) {
        this.hasShooted = true;
        this.missileList.push(this.weapon.shoot(this.renderCoordinates));
        setTimeout(() => {
          this.hasShooted = false;
        }, this.weapon.fireRate);
      }
    }
  }

  cycleWeapon() {
    if (this.weaponIndex == 1) {
      this.weaponIndex = 0;
    } else {
      this.weaponIndex++;
    }
    this.weapon = weapons[this.weaponIndex];
  }

  move() {
    /*
    this.missileList = this.missileList.filter(
      (missile) =>
        missile.hitboxCoordinates.x > 0 &&
        missile.hitboxCoordinates.x < this.canvasWidth
    );
    this.missileList.forEach((missile) => missile.move());
    */

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
