import renderEntity from "./EntityRender.js";
import renderMissile from "./MissileRender.js";

const playerImage = new Image();
const HPBar = new Image();
HPBar.src = "/images/HUD/hpbar.png";
const HP = new Image();
HP.src = "/images/HUD/hp.png";

function renderMainHP(player, context) {
  if (!player) {
    return;
  }
  const startingX = 10;
  const startingY = 10;
  context.drawImage(HPBar, startingX, startingY);
  const borderWidth = 7;
  const borderHeight = 5;
  for (let i = 0; i < player.hp; i++) {
    context.drawImage(
      HP,
      startingX + (borderWidth + i * 47),
      startingY + borderHeight
    );
  }
}
function renderSecondaryHP(player, context, secondaryX, secondaryY) {
  console.log(secondaryX + " " + secondaryY);
  context.drawImage(HPBar, secondaryX, secondaryY);
}

function renderHitbox(player, context) {
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
}

export function renderPlayer(player, context, socketID, additionalY) {
  const secondaryX = player.canvasWidth;
  const secondaryY = player.canvasHeight;
  if (player.health <= 0) return;
  playerImage.src = player.renderCoordinates.path;
  context.textAlign = "center";
  context.fillText(
    player.pseudo,
    player.renderCoordinates.x + player.renderCoordinates.width / 2,
    player.renderCoordinates.y - 5
  );
  context.drawImage(
    playerImage,
    player.renderCoordinates.x,
    player.renderCoordinates.y
  );
  if (player.missileList) {
    player.missileList.forEach((missile) => {
      renderMissile(missile, context);
    });
  }
  //renderHitbox(player, context);
  if (player.id === socketID) {
    renderMainHP(player, context);
  } else {
    renderSecondaryHP(
      player,
      context,
      secondaryX,
      secondaryY - additionalY * 10
    );
  }
}
