import BounceDiagonalMissile from "./BounceDiagonalMissile.js";
import Entity from "./Entity.js";
import LinearMissile from "./LinearMissile.js";


export default class BasicShooter extends Entity {
  constructor(image, speed,hp, renderCoordinates, imagebullet, renderCoordinatesProj, hitboxCoordinatesProj, varProjX, varProjY) {
    super(image, speed,hp, renderCoordinates);
    this.hitboxCoordinates = {
      "x": renderCoordinates.x,
      "y": renderCoordinates.y+10,
      "width": renderCoordinates.width,
      "height": renderCoordinates.height-28
    }  
  
    this.imagebullet = imagebullet;
    this.renderCoordinatesProj = renderCoordinatesProj;
    this.hitboxCoordinatesProj = hitboxCoordinatesProj;
    
    this.varProjX = varProjX;
    this.varProjY = varProjY;
    this.compteur = 0;
    this.canFire = setInterval(() => {
        console.log("fire");
        hitboxCoordinatesProj.x = this.hitboxCoordinates.x + this.varProjX;
        hitboxCoordinatesProj.y = this.hitboxCoordinates.y + this.varProjY;
        renderCoordinatesProj.x = this.renderCoordinates.x + this.varProjX;
        renderCoordinatesProj.y = this.renderCoordinates.y + this.varProjY;
        this.missileList.push(new LinearMissile(this.imagebullet, 15 ,999, renderCoordinatesProj));
    }, 1000);
    this.missileList = [];
    

  }
  
  move() {
    this.missileList = this.missileList.filter(
      (missile) => missile.hitboxCoordinates.x > 0 && missile.hitboxCoordinates.x < this.canvasWidth
    );
   
    this.missileList.forEach((missile) => missile.move());
    if (this.hitboxCoordinates.y + this.hitboxCoordinates.height > this.canvasHeight) {
      this.hitboxCoordinates.y = this.canvasHeight - this.hitboxCoordinates.height;
      this.speed = -this.speed;
      this.compteur++;
    }
    if (this.hitboxCoordinates.y < 0) {
      this.speed = Math.abs(this.speed);
      this.compteur++;
    }
    if (this.compteur > 1) {
      const newX = (Math.random()* this.canvasWidth/2) + this.canvasWidth/2;
      this.hitboxCoordinates.x = newX;
      this.renderCoordinates.x = newX;
      this.compteur = 0;
    }
    this.hitboxCoordinates.y += this.speed;
    this.renderCoordinates.y += this.speed;
  }
}
