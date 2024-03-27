export default function renderEntity(entity, context) {
  const image = new Image();
  image.src = entity.path;
  context.drawImage(image, entity.posX, entity.posY);

  if (entity.missileList) {
    entity.missileList.forEach((missile) => {
      renderEntity(missile, context);
    });
  }
}