export default function renderMissile(entity, context) {
    const image = new Image();
    image.src = entity.path;
    context.drawImage(image, entity.posX, entity.posY);
  }