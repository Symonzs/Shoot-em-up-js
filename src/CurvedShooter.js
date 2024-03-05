
import Entity from "./Entity.js";
import LowerCurvedMissile from "./LowerCurvedMissile.js";
import UpperCurvedMissile from "./UpperCurvedMissile.js";
import { Motion } from "./coordCalculator.js";


export default class CurvedShooter extends Entity {
  constructor(speed,hp, renderCoordinates, renderCoordinatesProj,movement) {
    super(speed,hp, renderCoordinates,movement);
    this.secondPhase = false;
    this.transition = false;
    setInterval(() => {
      this.secondPhase = true;
      setInterval(() => {
        this.transition = true;
      }, this.movement.transitionTime);
    }, this.movement.time);
    this.image = `/images/ships/basicshooter.png`;
    this.imagebullet = "/images/bullets/basicbullet.png";
    this.renderCoordinatesProj = renderCoordinatesProj;
    this.hitboxCoordinatesProj = renderCoordinatesProj;
    this.doSinuosidalatk = true;
    this.isAttacking = false;
    setInterval(() => {
      this.doSinuosidalatk = !this.doSinuosidalatk;
      setTimeout(() => {
        this.isAttacking = true;
      }, 1);
      setTimeout(() => {
        this.isAttacking = false;
      }, 4000);

    }, 5000);
    this.canFire = setInterval(() => {
      console.log("fire");
      if(this.isAttacking){
        const newMissileRenderCoordinatesUp = {
            "x": this.renderCoordinates.x,
            "y": this.renderCoordinates.y,
            "width": this.renderCoordinatesProj.width,
            "height": this.renderCoordinatesProj.height
          }
          const newMissileRenderCoordinatesDo = {
            "x": this.renderCoordinates.x,
            "y": this.renderCoordinates.y,
            "width": this.renderCoordinatesProj.width,
            "height": this.renderCoordinatesProj.height
          }
      this.missileList.push(new UpperCurvedMissile(this.imagebullet, 25,999,newMissileRenderCoordinatesUp));
      this.missileList.push(new LowerCurvedMissile(this.imagebullet, 25,999,newMissileRenderCoordinatesDo));
      }
    }, 100);
    this.missileList = [];
  }

  updateHitboxes() {
    this.hitboxCoordinates = {
      "x": this.renderCoordinates.x,
      "y": this.renderCoordinates.y,
      "width": this.renderCoordinates.width,
      "height": this.renderCoordinates.height
    }
  }

  move() {
    this.missileList = this.missileList.filter(
      (missile) => missile.hitboxCoordinates.x > 0 && missile.hitboxCoordinates.x < this.canvasWidth
    );
    this.missileList.forEach((missile) => missile.move());
    Motion(this);
    
    this.updateHitboxes();
  }
  }

