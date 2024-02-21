import Draw from "./draw.js";
import { calcCoord } from "./coordCalculator.js";
import { calcDistance } from "./coordCalculator.js";

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
  latestCursorY = 0;

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawList.forEach((draw) => draw.render(context));
  context.drawImage(image, x, y);
  latestImageX = x + image.width / 2;
  latestImageY = y + image.height / 2;
  requestAnimationFrame(render);
}

function moveMonster() {
  xSpeed = velocityX(calcDistance(latestImageX, latestCursorX));
  ySpeed = velocityY(calcDistance(latestImageY, latestCursorY));
  console.log(xSpeed, ySpeed);
  x -= xSpeed;
  y -= ySpeed;
}

setInterval(moveMonster, 1000 / 60);

canvas.addEventListener("mousemove", (event) => {
  if (event.offsetX != latestCursorX) {
    latestCursorX = event.offsetX;
  }
  if (event.offsetY != latestCursorY) {
    latestCursorY = event.offsetY;
  }
});

const time = 10;
const maxSpeed = 13;

const ratio = canvas.width / canvas.height;
const maxSpeedY = maxSpeed;
const maxSpeedX = maxSpeed * (ratio / 1.45);

export function velocityX(distance) {
  let negative = false;
  const speed = distance / time;
  if (speed < 0) {
    negative = true;
  }
  if (Math.abs(speed) + -0.5 < 0) {
    return 0;
  }
  if (Math.abs(speed) > maxSpeedX) {
    if (negative) {
      return -maxSpeedX;
    }
    return maxSpeedX;
  } else {
    return speed;
  }
}

export function velocityY(distance) {
  let negative = false;
  const speed = distance / time;
  if (speed < 0) {
    negative = true;
  }
  if (Math.abs(speed) + -0.5 < 0) {
    return 0;
  }
  if (Math.abs(speed) > maxSpeedY) {
    if (negative) {
      return -maxSpeedY;
    }
    return maxSpeedY;
  } else {
    return speed;
  }
}
