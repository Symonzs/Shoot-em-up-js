function renderHitbox(entity, context) {
  context.strokeStyle = "red";
  context.strokeRect(
    entity.hitboxCoordinates.x,
    entity.hitboxCoordinates.y,
    entity.hitboxCoordinates.width,
    entity.hitboxCoordinates.height
  );
  context.strokeStyle = "blue";
  context.strokeRect(
    entity.renderCoordinates.x,
    entity.renderCoordinates.y,
    entity.renderCoordinates.width,
    entity.renderCoordinates.height
  );
  context.strokeStyle = "black";
}

export default function renderMissile(entity, context) {
  const image = new Image();
  image.src = entity.renderCoordinates.path;
  context.drawImage(
    image,
    entity.renderCoordinates.x,
    entity.renderCoordinates.y
  );
  //renderHitbox(entity, context);
}
