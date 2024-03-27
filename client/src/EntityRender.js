import renderMissile from "./MissileRender.js";

export default function renderEntity(entity, context) {
  const image = new Image();
  image.src = entity.renderCoordinates.path;
  context.drawImage(
    image,
    entity.renderCoordinates.x,
    entity.renderCoordinates.y
  );
  if (entity.missileList) {
    entity.missileList.forEach((missile) => {
      renderMissile(missile, context);
    });
  }
}
