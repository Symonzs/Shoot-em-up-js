
import Entity from "./Entity.js";
import LaserMissile from "./LaserMissile.js";


export default class LaserShooter extends Entity {
  constructor(speed,hp, renderCoordinates, renderCoordinatesProj) {
    super(speed,hp, renderCoordinates);

    this.missileList = [];
    this.image = `/images/basicshooter.png`;
    this.imagebullet = "/images/basicbullet.png";
    this.renderCoordinatesProj = renderCoordinatesProj;
    this.hitboxCoordinatesProj = renderCoordinatesProj;
    this.updateHitboxes();

    this.varProjX = -10;
    this.varProjY = 35;
    
    
    this.canFire = setInterval(() => {
        const newMissileRenderCoordinates = {
          "x": this.renderCoordinates.x + this.varProjX,
          "y": this.renderCoordinates.y + this.varProjY,
          "width": this.renderCoordinatesProj.width,
          "height": this.renderCoordinatesProj.height
        }
        this.missileList.push(new LaserMissile(this.imagebullet,3, newMissileRenderCoordinates));
    }, 1000);
    

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
   
    this.missileList.forEach((missile) => missile.move(this.renderCoordinates.x + this.varProjX, this.renderCoordinates.y + this.varProjY));
    if (this.renderCoordinates.y + this.renderCoordinates.height > this.canvasHeight) {
      this.speed = -this.speed;
    } else if (this.renderCoordinates.y < 0) {
      this.renderCoordinates.y = 0;
      this.speed = Math.abs(this.speed);
    }
    this.renderCoordinates.y += this.speed;
    this.updateHitboxes();
    
  }


}
