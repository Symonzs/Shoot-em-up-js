export default function renderBonus(bonus, context) {
    const image = new Image();
    image.src = "/images/ships/basicshooter.png";
    context.save();
    context.globalAlpha = bonus.opacity;
    context.drawImage(image, bonus.renderCoordinates.x, bonus.renderCoordinates.y);
    context.restore();
    renderHitbox(bonus, context);
    console.log("rendered bonus");
}

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