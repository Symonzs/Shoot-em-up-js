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
    id: socket.id,
    x: event.offsetX,
    y: event.offsetY,
  };
  socket.emit("mousemove", mouseCoord);
});
let mouseIsDown = false;
canvas.addEventListener("mousedown", (event) => {
  mouseIsDown = true;
  console.log("client -> mousedown");
});

canvas.addEventListener("mouseup", (event) => {
  mouseIsDown = false;
  console.log("client -> mouseup");
});

function render() {
  if (game) {
    renderGame(game, context);
    if (mouseIsDown) {
      console.log("TIRE BATARD");
      socket.emit("mousedown", socket.id);
    }
  }
  requestAnimationFrame(render);
}

render();
socket.on("updatedGame", (receivedGame) => {
  game = receivedGame;
});
