import Entity from "./entities/Entity.js";
import detectCollision from "./utils/hit.js";

export default class Game {
  constructor(player) {
    this.entities = [];
    this.players = [];
    if (player) {
      this.players.push(player);
    }
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removeEntity() {
    //console.log(this.entities.length);
    this.players.forEach((player) => {
      // TODO: changer l'implémentation, le filter ne marchait plus pour une raison inconnue et étrange et chiante
      if (player.missileList) {
        let newList = [];
        player.missileList.forEach((missile) => {
          if (
            missile.hitboxCoordinates.x > 0 &&
            missile.hitboxCoordinates.x < player.canvasWidth
          ) {
            newList.push(missile);
          }
        });
        player.missileList = newList;
      }
    });

    this.entities.forEach((entity, index) => {
      if (entity.hitboxCoordinates.x < 0) {
        this.entities.splice(index, 1);
      }
      if (entity.missileList) {
        let newList = [];
        entity.missileList.forEach((missile) => {
          if (
            missile.hitboxCoordinates.x > 0 &&
            missile.hitboxCoordinates.x < entity.canvasWidth
          ) {
            newList.push(missile);
          }
        });
        // console.log(newList.length);
        entity.missileList = newList;
        // console.log(entity.missileList.length);
      }
      if (entity.hp < 1) {
        entity.renderCoordinates.x = -1000;
        entity.renderCoordinates.y = -1000;
        if (entity.missileList && entity.missileList.length < 1) {
          this.entities.splice(index, 1);
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
    if (this.players) {
      this.players.forEach((player) => {
        player.move();
        if (player.missileList.length != 0) {
          player.missileList.forEach((missile) => {
            missile.move();
          });
        }
      });
    }
    this.entities.forEach((entity) => {
      entity.shoot();
      entity.move();
      if (entity.missileList.length != 0) {
        entity.missileList.forEach((missile) => {
          missile.move();
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
