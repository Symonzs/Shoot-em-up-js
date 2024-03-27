import renderEntity from "./EntityRender.js";
import renderMissile from "./MissileRender.js";

const playerImage = new Image();

export default function renderPlayer(player, context) {
  if (player.health <= 0) return;
  playerImage.src = player.renderCoordinates.path;
  context.drawImage(
    playerImage,
    player.renderCoordinates.x,
    player.renderCoordinates.y
  );
  context.strokeStyle = "red";
  context.strokeRect(
    player.hitboxCoordinates.x,
    player.hitboxCoordinates.y,
    player.hitboxCoordinates.width,
    player.hitboxCoordinates.height
  );
  context.strokeStyle = "blue";
  context.strokeRect(
    player.renderCoordinates.x,
    player.renderCoordinates.y,
    player.renderCoordinates.width,
    player.renderCoordinates.height
  );
  context.strokeStyle = "black";
  if (player.missileList) {
    player.missileList.forEach((missile) => {
      renderMissile(missile, context);
    });
  }
}
