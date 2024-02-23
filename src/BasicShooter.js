import DiagonalMissile from "./DiagonalMissile.js";
import Entity from "./Entity.js";


export default class BasicShooter extends Entity {
  constructor(image, speed,hp, spawnX, spawnY, varProjX, varProjY) {
    super(image, speed,hp, spawnX, spawnY);
    this.x = spawnX;
    this.y = spawnY;
    this.varProjX = varProjX;
    this.varProjY = varProjY;
    this.compteur = 0;
    this.canFire = setInterval(() => {
      console.log("fire");
      this.missileList.push(new DiagonalMissile(this.imageMissile, 15,(Math.random()*61) -30  ,999, this.x + this.varProjX, this.y + this.varProjY));
    }, 1000);
    this.missileList = [];
    this.imageMissile = new Image();
    this.imageMissile.src = "/images/basicbullet.png";
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
    this.y += this.speed;
  }
}
