export default class Entity {
  constructor(image, speed, spawnX, spawnY) {
    this.image = image;
    this.speed = speed;
    this.spawnX = spawnX;
    this.spawnY = spawnY;
    this.x = spawnX;
    this.y = spawnY;
  }

  render() {
    console.log("render");
  }
}
