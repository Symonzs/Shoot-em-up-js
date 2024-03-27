export default class Entity {
  constructor(speed, hp, renderCoordinates, movement) {
    this.speed = speed;
    this.movement = movement;
    this.hitboxCoordinates = renderCoordinates;
    this.renderCoordinates = renderCoordinates;
    this.spawnX = this.hitboxCoordinates.x;
    this.spawnY = this.hitboxCoordinates.y;
    this.hp = hp;
    this.canBeHurt = true;
    this.canvasWidth = 1920;
    this.canvasHeight = 700;
  }
  render() {
    const values = {
      imageInfo: this.image,
      x: this.renderCoordinates.x,
      y: this.renderCoordinates.y,
      width: this.renderCoordinates.width,
      height: this.renderCoordinates.height,
    };
    return values;
  }
}
