import Missiles from "./Missiles.js";

export default class LinearMissile extends Missiles {
  constructor(image, speed,hp, renderCoordinates) {
    super(image, speed, hp, renderCoordinates);
    this.hp = hp;
    this.canBeHurt = false;
  }

  move(X,Y) {
    if(X && Y){
    if(this.renderCoordinates.x > X-300 ){
      this.renderCoordinates.x -= this.speed;
      this.hitboxCoordinates.x -= this.speed;
    }
  }
  else{
    this.renderCoordinates.x -= this.speed;
    this.hitboxCoordinates.x -= this.speed;
  }
}
}
