export default class Entity {
  constructor(image, speed,hp, renderCoordinates) {
    this.image = image;
    this.speed = speed;
    this.hitboxCoordinates = renderCoordinates;
    this.renderCoordinates = renderCoordinates;
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
