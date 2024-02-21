import Draw from "./draw.js";
import { calcCoord } from "./coordCalculator.js";
import { calcDistance } from "./coordCalculator.js";
import { velocity } from "./coordCalculator.js";

const canvas = document.querySelector(".gameCanvas"),
  context = canvas.getContext("2d"),
  canvasResizeObserver = new ResizeObserver(() => resampleCanvas());

canvasResizeObserver.observe(canvas);

function resampleCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

let drawList = [];
let latestImageX = 500;
let latestImageY = 500;
/*
canvas.addEventListener("mousedown", (event) => {
  drawList.push(
    new Draw(
      event.offsetX,
      event.offsetY,
      lineWidthSelector.value,
      colorSelector.value
    )
  );
  canvas.addEventListener("mousemove", onMouseMove);
});

canvas.addEventListener("mouseup", (event) =>
  canvas.removeEventListener("mousemove", onMouseMove)
);

function onMouseMove(event) {
  drawList[drawList.length - 1].append(event.offsetX, event.offsetY);
}
*/

requestAnimationFrame(render);

const image = new Image();
image.src = "/images/monster.png";
image.addEventListener("load", (event) => {
  requestAnimationFrame(render);
});

let x = latestImageX,
  y = latestImageY,
  xSpeed = 0,
  ySpeed = 0,
  latestCursorX = 0,
  latestCursorY = 0,
  magieNoir = 0;

let imageMiddleX = image.width / 2;

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawList.forEach((draw) => draw.render(context));
  context.drawImage(image, x, y);
  latestImageX = x;
  latestImageY = y;
  requestAnimationFrame(render);
}

function moveMonster() {
  magieNoir++;
  console.log(
    `distance x: ${calcDistance(latestImageX, latestCursorX)}, distance y: ${calcDistance(latestImageY, latestCursorY)} \n\n coordImage x: ${latestImageX}, coordImage y: ${latestImageY} \n\n coordCursor x: ${latestCursorX}, coordCursor y: ${latestCursorY} \n\n coord x: ${x}, coord y: ${y} \n\n speed x: ${xSpeed}, speed y: ${ySpeed} \n\n`
  );
}

setInterval(moveMonster, 10000 / 60);

canvas.addEventListener("mousemove", (event) => {
  if (event.offsetX != latestCursorX) {
    latestCursorX = event.offsetX;
  }
  if (event.offsetY != latestCursorY) {
    latestCursorY = event.offsetY;
  }
});
