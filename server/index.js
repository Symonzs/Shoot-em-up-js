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

io.on("connection", (socket) => {
  console.log("a user connected");
});
/*
 * Fin Magie Noir
 */

let entityList = [];
/*
const basicShooter = new BasicShooter(
  2,
  10,
  getRenderValues(basicShooterImageValues, 2000, 500),
  getProjectileRenderValues(basicShooterProjImageValues),
  {
    xSpeed: 1,
    ySpeed: 0,
    time: 10000,
    xSpeed1: 0,
    ySpeed1: 1,
    transitionTime: 10000,
  }
);
entityList.push(basicShooter);
*/
/*
 * Update de toutes les hitbox
 */
function updateHitboxes() {
  entityList.forEach((entity) => {
    entity.move();
  });
}

/*
 * Envois l'entityList a tous joueur a chaque frame afin qu'ils puissent le render.
 */
setInterval(function () {
  /**
   * faire les calcul et tt ici juste avant de l'envoyer aux joueurs
   */

  // move de chaque entité de entityList
  updateHitboxes();
  io.emit("update", entityList);
  //console.log(getImageValue("client/public/images/HUD/background.png"));
}, 1000 / 60);

updateImageValues();
