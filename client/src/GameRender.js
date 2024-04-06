import { renderPlayer } from "./JoueurRender.js";
import renderEntity from "./EntityRender.js";
const bg = new Image();
bg.src = "images/HUD/backgroundGreen.png";
let xOffSet = 0;

function renderBackground(context) {
  xOffSet = xOffSet - 1;
  console.log(xOffSet);
  const firstBackgroundOffSet = xOffSet;
  const secondBackgroundOffSet = xOffSet - 20 + bg.width;
  if (xOffSet === -bg.width + 20) {
    xOffSet = 0;
  }
  context.scale(0.8, 0.8);
  context.drawImage(bg, firstBackgroundOffSet, 0);
  context.drawImage(bg, secondBackgroundOffSet, 0);
  context.setTransform(1, 0, 0, 1, 0, 0);
}
export default function renderGame(game, context, socketID) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  renderBackground(context);
  game.entities.forEach((entity) => {
    renderEntity(entity, context);
  });
  let additionalY = 0;
  game.players.forEach((player) => {
    renderPlayer(player, context, socketID, additionalY);
    additionalY += 20;
  });
}
