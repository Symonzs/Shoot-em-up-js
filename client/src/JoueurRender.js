import renderEntity from "./EntityRender.js";
import renderMissile from "./MissileRender.js";

const playerImage = new Image();
const HPBar = new Image();
HPBar.src = "/images/HUD/hpbar.png";
const HP = new Image();
HP.src = "/images/HUD/hp.png";
const bulletIcon = new Image();

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
  if (player.weaponIndex === 1) {
    bulletIcon.src = "/images/HUD/bulletIcon2.png";
  } else {
    bulletIcon.src = "/images/HUD/bulletIcon1.png";
  }
  context.drawImage(bulletIcon, HPBar.width + 10, startingY);
}
function renderSecondaryHP(player, context, secondaryX, secondaryY) {
  //console.log(secondaryX + " " + secondaryY);
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

function renderName(player, context) {
  context.textAlign = "center";
  context.fillStyle = "white";
  context.fillText(
    player.pseudo,
    player.renderCoordinates.x + player.renderCoordinates.width / 2,
    player.renderCoordinates.y - 5
  );
  context.fillStyle = "black";
}

function drawPlayer(player, context, isClient) {
  if (isClient) {
    playerImage.src = player.renderCoordinates.path;
  } else {
    playerImage.src = "/images/ships/allyship2.png";
  }
  if (player.canBeTouched) {
    context.drawImage(
      playerImage,
      player.renderCoordinates.x,
      player.renderCoordinates.y
    );
  } else {
    context.globalAlpha = 0.1;
    context.drawImage(
      playerImage,
      player.renderCoordinates.x,
      player.renderCoordinates.y
    );
    context.globalAlpha = 1;
  }
  if (isClient) {
    renderMainHP(player, context);
  }
}

export function renderPlayer(player, context, socketID, additionalY) {
  if (player.health <= 0) return;
  const secondaryX = player.canvasWidth;
  const secondaryY = player.canvasHeight;
  renderName(player, context);
  console.log(
    `isClient -> ${player.id}===${socketID} = ${player.id == socketID}`
  );
  const isClient = player.id === socketID;
  drawPlayer(player, context, isClient);
  if (player.missileList) {
    player.missileList.forEach((missile) => {
      renderMissile(missile, context);
    });
  }
}
