import Entity from "./Entity.js";
import { Motion } from "./coordCalculator.js";

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
        this.image = `/images/ships/skull-1.png`
        this.imagebullet = `/images/bullets/skull-projectile.png`;
    }
    
  updateHitboxes() {
    this.hitboxCoordinates = {
      "x": this.renderCoordinates.x,
      "y": this.renderCoordinates.y+15,
      "width": this.renderCoordinates.width,
      "height": this.renderCoordinates.height-50
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