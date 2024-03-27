export default class Game {
  constructor(player) {
    this.entities = [];
    this.players = [];
    this.players.push(player);
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removeEntity() {
    this.entities.forEach((entity, index) => {
      if (entity.hp < 1) {
        entity.renderCoordinates.x = -1000;
        entity.renderCoordinates.y = -1000;
        if (entity.missileList && entity.missileList.length < 1) {
          entityList.splice(index, 1);
        }
      }
    });
  }

  removePlayer(player) {
    this.players = this.players.filter((p) => p !== player);
  }

  isInContact() {
    this.joueurs.forEach((joueur) => {
      this.entities.forEach((entity) => {
        detectCollision(entity, joueur, true);
        joueur.missileList.forEach((missile) => {
          const hit = detectCollision(missile, entity);
          if (hit) {
            missile.renderCoordinates.x = -1000;
          }
        });
        if (entity.missileList) {
          entity.missileList.forEach((missile) => {
            detectCollision(missile, joueur, true);
          });
        }
      });
    });
  }

  updateGame() {
    this.players.forEach((player) => {
      player.move();
    });
    this.entities.forEach((entity) => {
      entity.move();
    });
    this.isInContact();
    this.removeEntity();
  }

  launchWave(wave) {
    this.entities.push(wave);
  }

  startBossFight(boss) {
    this.entities.push(boss);
    // do cool things
  }
}
