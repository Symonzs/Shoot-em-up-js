import { io } from "socket.io-client";
import renderGame from "./GameRender.js";
import { renderHP } from "./JoueurRender.js";
import $ from "jquery";
import Router from "./Router.js";

export const socket = io();
let mouseIsDown;
function resampleCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

const routes = [
  { path: "/", view: $(".menu") },
  { path: "/game", view: $(".game") },
];

Router.routes = routes;
Router.titleElement = $(".viewTitle");
Router.setInnerLinks(document.body);

// chargement de la vue initiale selon l'URL demandée par l'utilisateur.rice (Deep linking)
Router.navigate(window.location.pathname);

// gestion des boutons précédent/suivant du navigateur (History API)
window.onpopstate = () => Router.navigate(document.location.pathname, true);

// gestion du formulaire

const $form = $(".loginForm");
$form.on("submit", function (event) {
  event.preventDefault();
  const text = $("input[name=name]").val();
  console.log(text);
  socket.emit("startGame", text);
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
  // console.log("client -> mousedown");
});

canvas.addEventListener("mouseup", (event) => {
  mouseIsDown = false;
  // console.log("client -> mouseup");
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
  console.log(receivedGame.players);
});
socket.on("connect", () => {
  console.log("connected");
});

socket.on("begone", () => {
  Router.navigate("/");
});

// socket.on("disconnect", () => {
//   console.log("a");
//   socket.emit("leaving", "a");
// });
