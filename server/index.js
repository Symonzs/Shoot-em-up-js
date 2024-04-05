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

export const io = new IOServer(httpServer, {
  // pour permettre à express-status-monitor de fonctionner
  // cf. https://github.com/RafalWilinski/express-status-monitor/issues/181#issuecomment-1086649762
  allowEIO3: true,
});

app.use(express.static("client/public"));

app.get("/*", (req, res) => {
  res.sendFile("client/public/index.html", fileOptions);
});

let games = [];

io.on("connection", (socket) => {
  socket.emit("begone");
  let playerGame;
  let firstConnection = true;
  socket.on("startGame", (data) => {
    if (firstConnection) {
      let newPlayer = new Joueur(socket.id, data);
      console.log(data);
      const newGame = new Game(newPlayer);
      newGame.addEntity(
        new BounceShooter(5, 60, 10, 500, 500, {
          xSpeed: 0,
          ySpeed: 0,
          time: 1000,
          xSpeed1: 0,
          ySpeed1: 0,
          transitionTime: 10000,
        })
      );
      games.push(newGame);
      playerGame = newGame;
      firstConnection = false;
    }
  });
  socket.on("mousemove", (mouseInfo) => {
    if (!firstConnection && playerGame) {
      const correspondingPlayer = playerGame.players.find(
        (player) => player.id === mouseInfo.id
      );
      if (correspondingPlayer) {
        correspondingPlayer.latestCursorX = mouseInfo.x;
        correspondingPlayer.latestCursorY = mouseInfo.y;
      }
    }
  });
  socket.on("mousedown", (id) => {
    if (!firstConnection && playerGame) {
      const correspondingPlayer = playerGame.players.find(
        (player) => player.id === id
      );
      if (correspondingPlayer) {
        correspondingPlayer.shoot();
      }
    }
  });
  socket.on("disconnect", (data) => {
    console.log(`leave ${socket.id}`);
    console.log(data);
    if (playerGame) {
      const toDelete = playerGame.players.find(
        (player) => player.id === socket.id
      );
      playerGame.removePlayer(toDelete);
    }
  });
});
/*
 * Fin Magie Noir
 */

setInterval(() => {
  games.forEach((game) => {
    game.updateGame();
  });
}, 1000 / 60);
