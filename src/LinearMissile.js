import Missiles from "./Missiles.js";

export default class LinearMissile extends Missiles {
  constructor(image, speed,hp, renderCoordinates) {
    super(speed, hp, renderCoordinates);
    if (!image) {
      this.image = "/images/bullets/basicbullet.png";
    } else {
      this.image = image;
    }
    this.canBeHurt = false;
  }

  move(X,Y) {
    if(X && Y){
    if(this.renderCoordinates.x > X-300 ){
      this.renderCoordinates.x -= this.speed;
    }
  }
  else{
    this.renderCoordinates.x -= this.speed;
  }
}
}
