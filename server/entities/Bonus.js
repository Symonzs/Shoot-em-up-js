
export default class Bonus{
    constructor(x,y,health){
        this.hitboxCoordinates = {
            x: x,
            y: y,
            width: 50,
            height: 50,
          };
        this.renderCoordinates = {
            x: x,
            y: y,
            width: 50,
            height: 50,
            path: "/images/bonus/health.png",
        };
        this.renderCoordinates.x = x;
        this.renderCoordinates.y = y;
        this.health = health;
        this.oppacity = 1;
    }

    updateHitboxes() {
        this.hitboxCoordinates = {
          x: this.renderCoordinates.x,
          y: this.renderCoordinates.y,
          width: this.renderCoordinates.width,
          height: this.renderCoordinates.height,
        };
      }

    move(){
        this.renderCoordinates.y = this.renderCoordinates.y;
        this.renderCoordinates.x = this.renderCoordinates.x;
        this.oppacity -= 0.001;
        this.updateHitboxes();
    }
}