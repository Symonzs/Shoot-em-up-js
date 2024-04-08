import { io } from "socket.io-client";
import renderGame from "./GameRender.js";

import $ from "jquery";
import Router from "./Router.js";

export const socket = io();
let mouseIsDown;
function resampleCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

socket.login = undefined;
socket.gameToJoin = undefined;
const routes = [
  { path: "/", view: $(".loginMenu") },
  { path: "/login", view: $(".loginMenu") },
  { path: "/game", view: $(".game") },
  { path: "/menu", view: $(".mainMenu") },
  { path: "/joinGame", view: $(".joinMenu") },
  { path: "/difficulty", view: $(".difficultyMenu") },
  { path: "/credit", view: $(".creditMenu") },
  { path: "/contributeurs", view: $(".contributeursMenu") },
];

Router.routes = routes;
Router.setInnerLinks(document.body);

// gestion des boutons précédent/suivant du navigateur (History API)
window.onpopstate = () => Router.navigate(document.location.pathname, true);

// gestion du formulaire de login
let text;
const $form = $(".loginForm");
$form.on("submit", function (event) {
  event.preventDefault();
  text = $("input[name=name]").val();
  socket.login = text;
  Router.navigate("/menu");
});

// gestion du formulaire de join de game
let gameID;
const $gameJoinForm = $(".gameJoinForm");
$gameJoinForm.on("submit", function (event) {
  event.preventDefault();
  gameID = $("input[name=gameID]").val();
  socket.gameToJoin = gameID;
  Router.navigate("/game");
});

$form.on("");
console.log($form);

const canvas = document.querySelector(".gameCanvas"),
  context = canvas.getContext("2d"),
  canvasResizeObserver = new ResizeObserver(() => resampleCanvas());

export const canvase = canvas;
export const contexte = context;

canvasResizeObserver.observe(canvas);
let game;
canvas.addEventListener("mousemove", (event) => {
  const mouseCoord = {
    id: socket.id,
    x: event.offsetX,
    y: event.offsetY,
  };
  socket.emit("mousemove", mouseCoord);
});
canvas.addEventListener("mousedown", (event) => {
  mouseIsDown = true;
});

canvas.addEventListener("mouseup", (event) => {
  mouseIsDown = false;
});

document.addEventListener("keydown", (event) => {
  if (Router.currentRoute.path === "/game") {
    if (event.key === "x") {
      console.log("changeWeapons");
      //socket.emit("changeWeapons");
    }
  }
});

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
socket.on("updateGame", (receivedGame) => {
  game = receivedGame;
});

socket.on("endGame", (receivedGame) => {
  $(".score").text(receivedGame.score);
  $(".time").text(receivedGame.time);
  $(".defeated").text(receivedGame.deafeatedEnnemies);
  $(".rejouerMenu").show();
});

socket.on("connect", () => {
  console.log("connected");
});

socket.on("begone", () => {
  Router.navigate("/login");
});

socket.on("error", (errorMsg) => {
  window.alert(errorMsg);
  Router.navigate("/menu");
  socket.gameToJoin = undefined;
});
