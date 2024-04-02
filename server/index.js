import http from "http";
import express from "express";
import { Server as IOServer } from "socket.io";
import addWebpackMiddleware from "./middlewares/addWebpackMiddleware.js";
import BasicShooter from "./entities/BasicShooter.js";
import Joueur from "./entities/joueur.js";
import Game from "./Game.js";
import CurvedShooter from "./entities/CurvedShooter.js";
import SniperShooter from "./entities/SniperShooter.js";
import BounceShooter from "./entities/BounceShooter.js";

// updateImageValues();

/**
 * Magie Noir
 */
const fileOptions = { root: process.cwd() };
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

app.get("/*", (req, res) => {
  res.sendFile("client/public/index.html", fileOptions);
});

let players = [];
let game = new Game();
game.addEntity(
  new BounceShooter(5, 60, 10, 1500, 500, {
    xSpeed: 0,
    ySpeed: 0,
    time: 1000,
    xSpeed1: 0,
    ySpeed1: 0,
    transitionTime: 10000,
  })
  /*new CurvedShooter(5, 600, 10, 1500, 500, {
    xSpeed: 0,
    ySpeed: 0,
    time: 1000,
    xSpeed1: 0,
    ySpeed1: 0,
    transitionTime: 10000,
  })
  */
  /*
  new BasicShooter(5, 60, 10, 1500, 500, {
    xSpeed: 0,
    ySpeed: 0,
    time: 1000,
    xSpeed1: 0,
    ySpeed1: 0,
    transitionTime: 10000,
  })
);*/
  /*new SniperShooter(5, 60, 10, 1500, 500, {
    xSpeed: 0,
    ySpeed: 0,
    time: 1000,
    xSpeed1: 0,
    ySpeed1: 0,
    transitionTime: 10000,
  })*/
);

io.on("connection", (socket) => {
  //console.log("CONNEXION -> ID:" + socket.id);
  //console.log("CONNEXION -> ID:" + socket.id);
  // a changer afin d'identifier les reuf par leur login
  let newPlayer = new Joueur(socket.id);
  game.addPlayer(newPlayer);
  game.players.forEach((player) => {
    //console.log(player.id);
  });
  socket.on("mousemove", (mouseInfo) => {
    const correspondingPlayer = game.players.find(
      (player) => player.id === mouseInfo.id
    );
    //console.log(correspondingPlayer);
    if (correspondingPlayer) {
      // console.log(
      //   `list of players -> ${game.players}\ngoodPlayer.id -> ${correspondingPlayer.id}`
      // );
      correspondingPlayer.latestCursorX = mouseInfo.x;
      correspondingPlayer.latestCursorY = mouseInfo.y;
    }
  });
  socket.on("mousedown", (id) => {
    const correspondingPlayer = game.players.find((player) => player.id === id);
    // console.log(correspondingPlayer);
    if (correspondingPlayer) {
      // console.log(
      //   `list of players -> ${game.players}\ngoodPlayer.id -> ${correspondingPlayer.id}`
      // );
      correspondingPlayer.shoot();
    }
  });
  socket.on("disconnect", () => {
    console.log(`leave ${socket.id}`);
    const toDelete = game.players.find((player) => player.id === socket.id);
    game.removePlayer(toDelete);
  });
});
/*
 * Fin Magie Noir
 */

/*
 * Envois l'entityList a tous joueur a chaque frame afin qu'ils puissent le render.
 */
setInterval(() => {
  /**
   * faire les calcul et tt ici juste avant de l'envoyer aux joueurs
   */
  // move de chaque entité de entityList
  game.updateGame();
  io.emit("updatedGame", game);
  //console.log(getImageValue("/images/HUD/background.png"));
}, 1000 / 60);
