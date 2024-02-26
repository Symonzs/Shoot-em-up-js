export default class Entity {
  constructor(image, speed,hp, renderCoordinates, hitboxCoordinates) {
    this.image = image;
    this.speed = speed;
    if (!hitboxCoordinates) {
      console.log("hitboxCoordinates is not defined");
      this.renderCoordinates = {x: 1000, y: 300, width: 0, height: 0};
      this.hitboxCoordinates = {x: 1000, y: 300, width: 0, height: 0};
    } else {
      this.renderCoordinates = renderCoordinates;
      this.hitboxCoordinates = hitboxCoordinates;
    }
    this.spawnX = this.hitboxCoordinates.x;
    this.spawnY = this.hitboxCoordinates.y; 
    this.hp = hp;
    this.canBeHurt = true;
    this.canvasWidth = 1920;
    this.canvasHeight = 1080;
  }
  render() {
    const values = {
      "imageInfo": this.image.path,
      "x": this.renderCoordinates.x,
      "y": this.renderCoordinates.y,
      "width": this.renderCoordinates.width,
      "height": this.renderCoordinates.height
    }
    return values;
  }
}
