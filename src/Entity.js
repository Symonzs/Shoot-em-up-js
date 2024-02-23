export default class Entity {
  constructor(image, speed,hp, spawnX, spawnY) {
    this.image = image;
    this.speed = speed;
    this.spawnX = spawnX;
    this.spawnY = spawnY;
    this.x = spawnX;
    this.y = spawnY;
    this.hp = hp;
    this.canBeHurt = true;
    this.canvasWidth = 1920;
    this.canvasHeight = 1080;
  }
  render() {
    const values = {
      "imageInfo": this.image,
      "x": this.x,
      "y": this.y
    }
    return values;
  }
}
