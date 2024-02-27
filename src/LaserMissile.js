import Missiles from "./Missiles.js";

export default class LaserMissile extends Missiles {
  constructor(image,hp, renderCoordinates) {
    super(0, hp, renderCoordinates);
    if (!image) {
      this.image = "/images/basicbullet.png";
    } else {
      this.image = image;
    }
    this.canBeHurt = false;
  }

  move(X,Y) {
    if(X && Y){
    this.renderCoordinates.x = X;
    this.renderCoordinates.y = Y;
  }
  else{
    this.renderCoordinates.x = this.renderCoordinates.x;
    this.renderCoordinates.y = this.renderCoordinates.y;
  }
}
}
