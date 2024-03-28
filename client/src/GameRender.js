import { renderPlayer } from "./JoueurRender.js";
import renderEntity from "./EntityRender.js";

export default function renderGame(game, context, socketID) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  game.entities.forEach((entity) => {
    renderEntity(entity, context);
  });
  let additionalY = 0;
  game.players.forEach((player) => {
    renderPlayer(player, context, socketID, additionalY);
    additionalY += 20;
  });
}
