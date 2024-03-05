import Entity from "./Entity.js";
import { Motion } from "./coordCalculator.js";
import LinearMissile from "./LinearMissile.js";

export default class SkullShooter extends Entity {
    constructor(speed,hp, renderCoordinates, renderCoordinatesProj, movement) {
        super(speed,hp, renderCoordinates, movement);
        this.secondPhase = false;
        this.transition = false;
        setTimeout(() => {
            this.secondPhase = true;
            setTimeout(() => {
                this.transition = true;
            }, this.movement.transitionTime);
        }, this.movement.time);
        this.missileList = [];
        this.imageNumber = 1;
        this.changeImage(this.imageNumber); 
        this.renderCoordinatesProj = renderCoordinatesProj;
        this.hitboxCoordinatesProj = renderCoordinatesProj;
        this.imagebullet = `/images/bullets/skull-projectile.png`;
        this.varProjX = 0;
        this.varProjY = 0;
    }
    
  updateHitboxes() {
    switch(this.imageNumber) {
        case 1:
            this.hitboxCoordinates = {
                "x": this.renderCoordinates.x,
                "y": this.renderCoordinates.y+15,
                "width": this.renderCoordinates.width,
                "height": this.renderCoordinates.height-50
              }
              break;
        case 2:
            this.hitboxCoordinates = {
                "x": this.renderCoordinates.x,
                "y": this.renderCoordinates.y+15,
                "width": this.renderCoordinates.width,
                "height": this.renderCoordinates.height-40
              }
              break;
        case 3:
            this.hitboxCoordinates = {
                "x": this.renderCoordinates.x,
                "y": this.renderCoordinates.y+15,
                "width": this.renderCoordinates.width,
                "height": this.renderCoordinates.height-31
              }
            break;
        case 4:
            this.hitboxCoordinates = {
                "x": this.renderCoordinates.x,
                "y": this.renderCoordinates.y+15,
                "width": this.renderCoordinates.width,
                "height": this.renderCoordinates.height-20
              }
            break;
        default:
            this.hitboxCoordinates = {
                "x": this.renderCoordinates.x,
                "y": this.renderCoordinates.y,
                "width": this.renderCoordinates.width,
                "height": this.renderCoordinates.height
    }
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

    changeImage(imageID) {
        this.image = `/images/ships/skull-${imageID}.png`;
        this.updateHitboxes();
    }
    
    shoot() {
        const newMissileRenderCoordinates = {
            "x": this.renderCoordinates.x + this.varProjX,
            "y": this.renderCoordinates.y + this.varProjY,
            "width": this.renderCoordinatesProj.width,
          "height": this.renderCoordinatesProj.height
        }
        this.missileList.push(new LinearMissile(this.imagebullet, 10 ,999, newMissileRenderCoordinates));
    }
}