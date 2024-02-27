import BounceDiagonalMissile from "./BounceDiagonalMissile.js";
import DiagonalMissile from "./DiagonalMissile.js";
import Entity from "./Entity.js";
import LinearMissile from "./LinearMissile.js";

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}


export default class BasicShooter extends Entity {
  constructor(speed,hp, renderCoordinates, renderCoordinatesProj) {
    super(speed,hp, renderCoordinates);

    this.missileList = [];
    this.image = `/images/basicshooter.png`;
    this.imagebullet = "/images/basicbullet.png";
    this.renderCoordinatesProj = renderCoordinatesProj;
    this.hitboxCoordinatesProj = renderCoordinatesProj;
    this.updateHitboxes();

    this.varProjX = -20;
    this.varProjY = 35;
    this.compteur = 0;
    
    this.canFire = setInterval(() => {
        const newMissileRenderCoordinates = {
          "x": this.renderCoordinates.x + this.varProjX,
          "y": this.renderCoordinates.y + this.varProjY,
          "width": this.renderCoordinatesProj.width,
          "height": this.renderCoordinatesProj.height
        }
        this.missileList.push(new LinearMissile(this.imagebullet, 10 ,999, newMissileRenderCoordinates));
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
   
    this.missileList.forEach((missile) => missile.move());
    if (this.renderCoordinates.y + this.renderCoordinates.height > this.canvasHeight) {
      this.speed = -this.speed;
    } else if (this.renderCoordinates.y < 0) {
      this.renderCoordinates.y = 0;
      this.speed = Math.abs(this.speed);
    }
    this.renderCoordinates.y += this.speed;
    this.updateHitboxes();
    /*
    if (this.renderCoordinates.y + this.renderCoordinates.height > this.canvasHeight) {
      this.hitboxCoordinates.y = this.canvasHeight - this.renderCoordinates.height;
      this.renderCoordinates.y = this.canvasHeight - this.renderCoordinates.height;
      this.speed = -this.speed;
      this.compteur++;
    }
    if (this.renderCoordinates.y < 0) {
      this.speed = Math.abs(this.speed);
      this.compteur++;
    }
    if (this.compteur > 1) {
      const newX = (Math.random()* this.canvasWidth/2) + this.canvasWidth/2;
      this.renderCoordinates.x = newX;
      this.compteur = 0;
    }
    this.renderCoordinates.y += this.speed;
    */
  }


}
