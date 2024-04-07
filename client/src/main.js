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

const routes = [
  { path: "/", view: $(".loginMenu") },
  { path: "/login", view: $(".loginMenu") },
  { path: "/game", view: $(".game") },
  { path: "/menu", view: $(".mainMenu") },
  { path: "/joinGame", view: $(".joinMenu") },
  { path: "/credit", view: $(".credit") },
  { path: "/contributeurs", view: $(".contributeurs") },
];

Router.routes = routes;
Router.setInnerLinks(document.body);

// chargement de la vue initiale selon l'URL demandée par l'utilisateur.rice (Deep linking)
Router.navigate(window.location.pathname);

// gestion des boutons précédent/suivant du navigateur (History API)
window.onpopstate = () => Router.navigate(document.location.pathname, true);

// gestion du formulaire
let text;
const $form = $(".loginForm");
$form.on("submit", function (event) {
  event.preventDefault();
  text = $("input[name=name]").val();
  socket.login = text;
  Router.navigate("/menu");
});

$(".createGame").on("click", () => {
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
socket.on("connect", () => {
  console.log("connected");
});

socket.on("begone", () => {
  //Router.navigate("/login");
});

socket.on("list", (games) => {
  console.log("je suis bien dans le socket.on('list')");
  const joinGameRoute = routes.find((route) => route.path === "/joinGame");
  const htmlGameList = $(joinGameRoute.view.find(".gameList"));
  console.log(htmlGameList.html);
  //console.log(renderJoinGame(games));
  htmlGameList.html = renderJoinGame(games);
});
