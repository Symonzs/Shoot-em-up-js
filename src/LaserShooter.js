
import Entity from "./Entity.js";
import LaserMissile from "./LaserMissile.js";
import { Motion } from "./coordCalculator.js";


export default class LaserShooter extends Entity {
  constructor(speed,hp, renderCoordinates, renderCoordinatesProj) {
    super(speed,hp, renderCoordinates);
    this.initialSpeed = speed;
    this.missileList = [];
    this.image = `/images/basicshooter.png`;
    this.imagebullet = "/images/redlaser.png";
    this.renderCoordinatesProj = renderCoordinatesProj;
    this.hitboxCoordinatesProj = renderCoordinatesProj;
    this.updateHitboxes();

    this.varProjX = -10;
    this.varProjY = 35;
    
    
    this.canFire = setInterval(() => {
        const newMissileRenderCoordinates = {
          "x": (this.renderCoordinates.x + this.varProjX) - this.renderCoordinatesProj.width,
          "y": this.renderCoordinates.y + this.varProjY,
          "width": this.renderCoordinatesProj.width,
          "height": this.renderCoordinatesProj.height
        }
        this.speed = 0;
        this.missileList.push(new LaserMissile(this.imagebullet,3, newMissileRenderCoordinates));
        setTimeout(() => {
            this.missileList = [];
            this.speed = this.initialSpeed;
        }, 2000);
    },5000);
    

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
    
   
    this.missileList.forEach((missile) => missile.move(this.renderCoordinates.x + this.varProjX - this.renderCoordinatesProj.width, this.renderCoordinates.y + this.varProjY));
    Motion(this);
    this.updateHitboxes();
    
  }


}
