import Missiles from "./Missiles.js";

export default class HomingMissile extends Missiles {
  constructor(speedX, damage, x, y, player) {
    super(speedX, 0, damage, "/images/bullets/basicbullet.png", x, y);
    if (player) {
      this.target = player;
    }
  }

  move(targetedPlayer) {
    if (targetedPlayer) {
      const distanceX =
        targetedPlayer.hitboxCoordinates.x - this.renderCoordinates.x;
      const distanceY =
        targetedPlayer.hitboxCoordinates.y - this.renderCoordinates.y;

      // Calcul de la direction vers laquelle le missile doit se déplacer
      const angle = Math.atan2(distanceY, distanceX);

      // Calcul de la vitesse en fonction de la direction
      const speedX = Math.cos(angle) * 5;
      const speedY = Math.sin(angle) * 5;

      // Déplacement du missile
      this.renderCoordinates.x += speedX;
      this.renderCoordinates.y += speedY;
    } else {
      this.renderCoordinates.x = 10000;
      this.renderCoordinates.y = 10000;
    }
    this.updateHitboxes();
  }
}
