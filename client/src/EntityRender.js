import renderMissile from "./MissileRender.js";

export default function renderEntity(entity, context) {
  const image = new Image();
  image.src = entity.path;
  context.drawImage(
    entity.renderCoordinates.path,
    entity.renderCoordinates.x,
    entity.renderCoordinates.y
  );
  if (entity.missileList) {
    entity.missileList.forEach((missile) => {
      renderMissile(missile, context);
    });
  }
}
