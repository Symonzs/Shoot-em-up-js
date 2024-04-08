import { getPlayerById } from "./utils/CoordCalculator.js";
import Entity from "./entities/Entity.js";
import detectCollision from "./utils/Hit.js";
import { io } from "./index.js";
import spawnRandomMonster from "./SpawnRandomMonster.js";

export default class Game {
  constructor(player, id, difficulty) {
    this.frameCounter = 0;
    this.canBeJoined = true;
    this.entities = [];
    this.players = [];
    this.score = 0;
    this.id = id;
    if (difficulty) {
      this.difficulty = difficulty;
    } else {
      this.difficulty = 0;
    }
    if (player) {
      this.addPlayer(player);
    }
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  addPlayer(player) {
    if (this.difficulty) {
      this.player.hp = this.player.hp - this.difficulty;
    }
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
        entity.renderCoordinates.x = 5000;
        entity.renderCoordinates.y = 5000;
        //console.log("je suis tp un moment en -1000 -1000");
        if (entity.missileList && entity.missileList.length < 1) {
          //console.log("ma liste est vide ???");
          this.entities.splice(index, 1);
        }
      }
    });
  }

  removePlayer(id) {
    this.players = this.players.filter((p) => p.id !== id);
  }

  isInContact() {
    this.players.forEach((joueur) => {
      this.entities.forEach((entity) => {
        if (detectCollision(entity, joueur, true)) {
          entity.hp = 0;
          this.score -= entity.score * 5;
          if (this.score < 0) {
            this.score = 0;
          }
        }
        joueur.missileList.forEach((missile) => {
          const hit = detectCollision(missile, entity);
          if (hit) {
            missile.renderCoordinates.x = -1000;
            if (entity.hp <= 0) {
              this.score += entity.score;
            }
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
  endGame() {
    this.players.forEach((player) => {
      io.to(player.id).emit("endGame", this);
      this.canBeJoined = false;
    });
  }

  randomEvent() {
    const randomValue = Math.floor(Math.random() * 100) + 1;
    if (randomValue <= 50) {
      const randomMonsterIndex = Math.floor(Math.random() * 5) + 1;
      const monsterToAdd = spawnRandomMonster(randomMonsterIndex);
      if (monsterToAdd) {
        this.addEntity(monsterToAdd);
      }
    }
  }

  updateGame() {
    this.frameCounter++;
    if (this.frameCounter == 60) {
      this.randomEvent();
      this.frameCounter = 0;
    }
    if (this.canBeJoined) {
      this.score++;

      if (this.players) {
        if (this.players.filter((player) => player.hp <= 0).length > 0) {
          //TODO make the game end :p
          this.endGame();
        }
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
        entity.shoot(
          this.players[Math.floor(Math.random() * this.players.length)]
        );
        entity.move();
        if (entity.missileList.length != 0) {
          entity.missileList.forEach((missile) => {
            //console.log(missile.target);

            //console.log(getPlayerById(this.players,missile.target));
            if (missile.target) {
              missile.move(getPlayerById(this.players, missile.target.id));
            } else {
              missile.move();
            }
          });
        }
      });
      this.isInContact();
      this.removeEntity();
      this.players.forEach((player) => {
        io.to(player.id).emit("updateGame", this);
      });
    }
  }

  launchWave(wave) {
    this.entities.push(wave);
  }

  startBossFight(boss) {
    this.entities.push(boss);
    // do cool things
  }
}
