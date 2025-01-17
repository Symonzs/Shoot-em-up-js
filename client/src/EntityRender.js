import renderMissile from "./MissileRender.js";

function renderHitbox(entity, context) {
  context.strokeStyle = "red";
  context.strokeRect(
    entity.hitboxCoordinates.x,
    entity.hitboxCoordinates.y,
    entity.hitboxCoordinates.width,
    entity.hitboxCoordinates.height
  );
  context.strokeStyle = "black";
}

export default function renderEntity(entity, context) {
  const image = new Image();
  image.src = entity.renderCoordinates.path;
  context.drawImage(
    image,
    entity.renderCoordinates.x,
    entity.renderCoordinates.y
  );
  renderHitbox(entity, context);
  if (entity.missileList) {
    entity.missileList.forEach((missile) => {
      renderMissile(missile, context);
    });
  }
}
