import { renderMissiles } from "./renderMissiles.js";

const playerImage = new Image();

export default function renderPlayer(player, context) {
  if (player.health <= 0) return;
  playerImage.src = player.sprite;
  context.drawImage(playerImage, player.posX, player.posY);
  renderMissiles(player.missiles, context);
}
