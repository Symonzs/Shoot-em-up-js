import { renderPlayer } from "./JoueurRender.js";
import renderEntity from "./EntityRender.js";

export default function renderGame(game, context, socketID) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  game.entities.forEach((entity) => {
    renderEntity(entity, context);
  });
  game.players.forEach((player) => {
    renderPlayer(player, context, socketID);
  });
}
