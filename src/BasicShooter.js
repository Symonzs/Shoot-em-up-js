import BounceDiagonalMissile from "./BounceDiagonalMissile.js";
import getInitialImageValues from "./GetInitialImage.js";
import Entity from "./Entity.js";
import LinearMissile from "./LinearMissile.js";


export default class BasicShooter extends Entity {
  constructor(image, speed,hp, spawnX, spawnY, varProjX, varProjY,imagebullet) {
    super(image, speed,hp, spawnX, spawnY);
    console.log(this.image);
    this.imagebullet = imagebullet;
    this.x = spawnX;
    this.y = spawnY;
    this.varProjX = varProjX;
    this.varProjY = varProjY;
    this.compteur = 0;
    this.canFire = setInterval(() => {
      if(this.compteur === 0){
        console.log("fire");
      this.missileList.push(new LinearMissile(this.imagebullet, 15 ,999, this.x + this.varProjX, this.y + this.varProjY));
        this.compteur ++;
    }
    }, 1000);
    this.missileList = [];
    

  }
  
  move() {
    this.missileList = this.missileList.filter(
      (missile) => missile.x > 0 && missile.x < this.canvasWidth
    );
   
    this.missileList.forEach((missile) => missile.move());
    if (this.y + this.image.height > this.canvasHeight) {
      //this.y = canvase.height - this.image.height;
      this.speed = -this.speed;
      this.compteur++;
    }
    if (this.y < 0) {
      this.speed = Math.abs(this.speed);
      this.compteur++;
    }
    if (this.compteur > 1) {
      this.x = (Math.random() * this.canvasWidth/2) + this.canvasWidth/2;
      this.compteur = 0;
    }
    //this.y += this.speed;
  }
}
