import BounceDiagonalMissile from "./BounceDiagonalMissile.js";
import Entity from "./Entity.js";
import LinearMissile from "./LinearMissile.js";


export default class BasicShooter extends Entity {
  constructor(speed,hp, renderCoordinates, renderCoordinatesProj, varProjX, varProjY) {
    super(speed,hp, renderCoordinates);

    this.missileList = [];
    console.log(renderCoordinatesProj);
    this.image = `/images/Sprite-0002.png`;
    this.imagebullet = "/images/basicbullet.png";
    this.renderCoordinatesProj = renderCoordinatesProj;
    this.hitboxCoordinatesProj = renderCoordinatesProj;
    this.updateHiboxes();

    this.varProjX = varProjX;
    this.varProjY = varProjY;
    this.compteur = 0;
    
    this.canFire = setInterval(() => {
        console.log("fire");
        const newMissileRenderCoordinates = {
          "x": this.renderCoordinates.x + this.varProjX,
          "y": this.renderCoordinates.y + this.varProjY,
          "width": this.renderCoordinatesProj.width,
          "height": this.renderCoordinatesProj.height
        }
        this.missileList.push(new LinearMissile(this.imagebullet, 10 ,999, newMissileRenderCoordinates));
    }, 1000);
    

  }
  

  updateHiboxes() {
    this.hitboxCoordinates = {
      "x": this.renderCoordinates.x,
      "y": this.renderCoordinates.y+10,
      "width": this.renderCoordinates.width,
      "height": this.renderCoordinates.height-28
    }
  }

  move() {
    this.missileList = this.missileList.filter(
      (missile) => missile.hitboxCoordinates.x > 0 && missile.hitboxCoordinates.x < this.canvasWidth
    );
   
    this.missileList.forEach((missile) => missile.move());
    console.log(this.renderCoordinates.y + this.renderCoordinates.height);
    if (this.renderCoordinates.y + this.renderCoordinates.height > this.canvasHeight) {
      this.speed = -this.speed;
    } else if (this.renderCoordinates.y < 0) {
      this.renderCoordinates.y = 0;
      this.speed = Math.abs(this.speed);
    }
    this.renderCoordinates.y += this.speed;
    this.updateHiboxes();
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
