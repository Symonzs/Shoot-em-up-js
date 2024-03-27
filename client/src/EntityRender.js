import renderMissiles from "./MissileRender.js";

export default function renderPlayer(entity, context) {
  const image = new Image();
  image.src = entity.path;
  context.drawImage(image, entity.posX, entity.posY);
  if (entity.missiles) {
    renderMissiles(entity.missiles, context);
  }
}
