import Entity from "./entities/Entity.js";

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
    this.players.forEach((player) => {
      if (player.missileList) {
        player.missileList = player.missileList.filter((missile) => {
          /* missile.hitboxCoordinates.x > 0 */ true &&
            missile.hitboxCoordinates.x < player.canvasWidth;
        });
      }
    });

    this.entities.forEach((entity, index) => {
      if (entity.missileList) {
        entity.missileList = entity.missileList.filter(
          (missile) =>
            missile.hitboxCoordinates.x > 0 &&
            missile.hitboxCoordinates.x < entity.canvasWidth
        );
      }
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
    this.players.forEach((joueur) => {
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
      if (player.missileList.lenght != 0) {
        player.missileList.forEach((missile) => {
          missile.move();
        });
      }
    });
    this.entities.forEach((entity) => {
      entity.move();
      console.log("je bouge une entitée");
      if (entity.missileList.length != 0) {
        entity.missileList.forEach((missile) => {
          missile.move();
          console.log("je bouge un missile");
        });
      }
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
