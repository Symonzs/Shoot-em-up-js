import { renderPlayer } from "./JoueurRender.js";
import renderEntity from "./EntityRender.js";
const bg = new Image();
bg.src = "images/HUD/backgroundGreen.png";
let xOffSet = 0;

function renderBackground(context) {
  xOffSet = xOffSet - 0.1;
  if (xOffSet === -bg.width + context.canvas.width) {
    xOffSet = 0;
  }
  context.drawImage(bg, xOffSet, 0);
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
