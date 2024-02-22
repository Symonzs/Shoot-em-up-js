import Entity from "./Entity.js";
import { canvase } from "./main.js";
import { contexte } from "./main.js";
import Missile from "./missile.js";

export default class Joueur extends Entity {
  constructor(image, speed,hp, spawnX, spawnY) {
    super(image, speed,hp, spawnX, spawnY);
    this.x = spawnX;
    this.y = spawnY;
    this.compteur = 0;
    this.canFire = setInterval(() => {
      this.missileList.push(new Missile(this.imageMissile, 15,999, this.x, this.y));
    }, 5000);
    this.missileList = [];
    this.imageMissile = new Image();
    this.imageMissile.src = "/images/mechant.png";
  }

  move() {
    this.missileList = this.missileList.filter(
      (missile) => missile.x > 0 && missile.x < canvase.width
    );
   
    this.missileList.forEach((missile) => missile.move());
      
    if (this.y + this.image.height > canvase.height) {
      //this.y = canvase.height - this.image.height;
      this.speed = -this.speed;
      this.compteur++;
    }
    if (this.y < 0) {
      this.speed = Math.abs(this.speed);
      this.compteur++;
    }
    if (this.compteur > 1) {
      this.x = Math.random() * canvase.width;
      this.compteur = 0;
    }
    this.y += this.speed;
  }

  render() {
    this.missileList.forEach((missile) => missile.render(contexte));

    contexte.drawImage(this.image, this.x, this.y);
  }
}
