import http from "http";
import express from "express";
import { readFileSync } from "node:fs";
import { Server as IOServer } from "socket.io";
import {
  getValues,
  getImageValue,
  updateImageValues,
} from "./utils/getValues.js";
import addWebpackMiddleware from "./middlewares/addWebpackMiddleware.js";
import BasicShooter from "./entities/BasicShooter.js";
import { getValuesFromFile } from "./utils/EntityInitialValues.js";
import { getJSONValues } from "./utils/getImageValues.js";

// updateImageValues();
/**
 * Magie Noir
 */
const app = express();
const httpServer = http.createServer(app);

addWebpackMiddleware(app);

let port = process.env.PORT;
if (!port) port = 8000;
httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

const io = new IOServer(httpServer, {
  // pour permettre à express-status-monitor de fonctionner
  // cf. https://github.com/RafalWilinski/express-status-monitor/issues/181#issuecomment-1086649762
  allowEIO3: true,
});

app.use(express.static("client/public"));

let player = [];

io.on("connection", (socket) => {
  player.push(socket.id);
});
/*
 * Fin Magie Noir
 */

let entityList = [];
const basicShooter = new BasicShooter(
  2,
  10,
  "/images/extra/mechant.png",
  2,
  2,
  "/images/bullets/basicbullet.png",
  {
    xSpeed: 0.05,
    ySpeed: 0,
    time: 0,
    xSpeed1: -0.05,
    ySpeed1: 0,
    transitionTime: 0,
  }
);
entityList.push(basicShooter);
/*
 * Update de toutes les hitbox
 */
function updateHitboxes() {
  entityList.forEach((entity) => {
    //console.log(getJSONValues("/images/ships/basicshooter.png"));
    entity.move();
  });
}

/*
 * Envois l'entityList a tous joueur a chaque frame afin qu'ils puissent le render.
 */
setInterval(() => {
  /**
   * faire les calcul et tt ici juste avant de l'envoyer aux joueurs
   */
  // move de chaque entité de entityList
  updateHitboxes();
  io.emit("update", entityList);
  //console.log(getImageValue("/images/HUD/background.png"));
}, 1000 / 60);
