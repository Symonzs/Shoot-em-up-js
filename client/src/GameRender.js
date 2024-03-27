import renderMissiles from "./MissileRender.js";
import renderPlayer from "./PlayerRender.js";
import renderEntity from "./EntityRender.js";

export default function renderGame(game, context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  game.entities.forEach((entity) => {
    renderEntity(entity, context);
  });
  game.players.forEach((player) => {
    renderPlayer(player, context);
  });
  game.missiles.forEach((missile) => {
    renderMissiles(missile, context);
  });
}
