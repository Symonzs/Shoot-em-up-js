import { io } from "socket.io-client";
import renderGame from "./GameRender.js";
import { renderHP } from "./JoueurRender.js";
export const socket = io(); //de base c'est pas en export frr chef
function resampleCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

const canvas = document.querySelector(".gameCanvas"),
  context = canvas.getContext("2d"),
  canvasResizeObserver = new ResizeObserver(() => resampleCanvas());

export const canvase = canvas;
export const contexte = context;

canvasResizeObserver.observe(canvas);
let game;

function render() {
  if (game) {
    renderGame(game, context, socket.id);
    if (mouseIsDown) {
      socket.emit("mousedown", socket.id);
    }
  }
  requestAnimationFrame(render);
}

render();
socket.on("updatedGame", (receivedGame) => {
  game = receivedGame;
});
socket.on("connect", () => {
  console.log("connected");
});

import Router from "./router.js";
import PlayMenu from "./menu/playMenu.js";
import $, { event } from "jquery";
import { io } from "socket.io-client";
import LoginMenu from "./menu/loginMenu.js";
import startGameRenderer, {
  setGame,
  stopGameRenderer,
  startTransition,
} from "./game/renderGame.js";

PlayMenu.setMenu($(".menuJouer"));
LoginMenu.setLogin($(".login"));

const routes = [
  { path: "/", view: $(".accueil") },
  { path: "/jeu", view: $(".jeu") },
  { path: "/credits", view: $(".credits") },
  { path: "/rejouer", view: $(".rejouer") },
  { path: "/scores", view: $(".scores") },
];

Router.routes = routes;
Router.notFound = $(".notFound");

Router.setInnerLinks(document.body);

window.onpopstate = () => {
  Router.navigate(document.location.pathname, true);
};

socket.on("gameStart", (game) => {
  canvas.addEventListener("mousemove", (event) => {
    const mouseCoord = {
      id: socket.id,
      x: event.offsetX,
      y: event.offsetY,
    };
    socket.emit("mousemove", mouseCoord);
  });
  let mouseIsDown = false;
  canvas.addEventListener("mousedown", (event) => {
    mouseIsDown = true;
    // console.log("client -> mousedown");
  });

  canvas.addEventListener("mouseup", (event) => {
    mouseIsDown = false;
    // console.log("client -> mouseup");
  });
  setGame(game);
  startGameRenderer();
});

socket.on("gameUpdate", (game) => {
  setGame(game);
});

socket.on("gameStop", (data) => {
  stopGameRenderer();
  Router.navigate("/rejouer");
  socket.emit("gameStop");
});

socket.on("stageTransition", (previousStage) => {
  startTransition(previousStage);
});

socket.on("stageTransition", (newStage) => {
  startTransition(newStage);
});

socket.on("userLogin", (login) => {
  window.sessionStorage.setItem("user", login);
  user = login;
  setAllCarouselData();
  Router.navigate("/");
});

socket.on("changePath", (path) => {
  Router.navigate(path);
});

socket.on("serverAlert", (message) => {
  alert(message);
});

socket.on("gameWin", (data) => {
  stopGameRenderer();
  Router.navigate("/rejouer");
  socket.emit("gameWin", data);
});

function setAllCarouselData() {
  socket.emit("setCarousel", user);
  socket.on("setCarousel", ({ playerData, playerSkins, weaponSkins }) => {
    carouselLife = new CarouselStat(
      $(".personnalisation .health"),
      playerData.health,
      "health"
    );
    carouselDamage = new CarouselStat(
      $(".personnalisation .damage"),
      playerData.damage,
      "damage"
    );
    carouselSpeed = new CarouselStat(
      $(".personnalisation .speed"),
      playerData.speed,
      "speed"
    );
    carouselFireRate = new CarouselStat(
      $(".personnalisation .fireSpeed"),
      playerData.fireSpeed,
      "fireSpeed"
    );
    carouselSkin = new CarouselSkin(
      $(".personnalisation .skin"),
      playerSkins,
      playerData.skinsPool,
      playerData.currentSkin,
      false
    );
    carouselProjSkin = new CarouselSkin(
      $(".personnalisation .proj-skin"),
      weaponSkins,
      playerData.weaponsPool,
      playerData.currentWeapon,
      true
    );
  });
}

window.addEventListener("unload", (event) => {
  if (user) socket.emit("close", user);
});

window.addEventListener("load", (event) => {
  if (user) socket.emit("open", user);
  //if(user) setTimeout(() => socket.emit('open', user), 1000);
});

export function setUserNull() {
  user = null;
  window.sessionStorage.removeItem("user");
}

// socket.on("disconnect", () => {
//   console.log("a");
//   socket.emit("leaving", "a");
// });
