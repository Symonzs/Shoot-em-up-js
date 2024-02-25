import Missiles from "./Missiles.js";

export default class LinearMissile extends Missiles {
  constructor(image, speed,hp, spawnX, spawnY) {
    super(image, speed, spawnX, spawnY);
    this.x = spawnX;
    this.y = spawnY;
    this.hp = hp;
    this.canBeHurt = false;
  }

  

  move(X,Y) {
    if(X && Y){
    if(this.x > X-300 ){
        this.x -= this.speed;
    }
  }
  else{
    this.x -= this.speed;
  }
}
}
