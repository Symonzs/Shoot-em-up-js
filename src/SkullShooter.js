import Entity from "./Entity.js";

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
        this.image = `/images/skullshooter.png`;
    }
}