import { io } from "socket.io-client";
import renderGame from "./GameRender.js";
import renderPlayer from "./JoueurRender.js";
const socket = io();

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

canvas.addEventListener("mousemove", (event) => {
  //console.log(`${event.offsetX}, ${event.offsetY}`);
  const mouseCoord = {
    x: event.offsetX,
    y: event.offsetY,
  };
  socket.emit("mousemove", mouseCoord);
});

function render() {
  if (game) {
    renderGame(game, context);
  }
  requestAnimationFrame(render);
}

render();
socket.on("updatedGame", (receivedGame) => {
  game = receivedGame;
});
