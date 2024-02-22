import Draw from "./draw.js";
import Entity from "./Entity.js";
import Joueur from "./joueur.js";
import KamikazeEnemy from "./KamikazeEnemy.js";

const canvas = document.querySelector(".gameCanvas"),
  context = canvas.getContext("2d"),
  canvasResizeObserver = new ResizeObserver(() => resampleCanvas()),
  lineWidthSelector = document.querySelector('input[type="range"]'),
  colorSelector = document.querySelector('input[type="color"]');

export const canvase = canvas;
export const contexte = context;

canvasResizeObserver.observe(canvas);

lineWidthSelector.value = context.lineWidth;
colorSelector.value = context.strokeStyle;

function resampleCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

let drawList = [];
let entityList = [];
let canBeTouched = true;

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

requestAnimationFrame(render);

const image = new Image();
image.src = "/images/monster.png";
image.addEventListener("load", (event) => {
  requestAnimationFrame(render);
});

const imagemechant = new Image();
imagemechant.src = "/images/Sprite-0002.png";

const monster = new Joueur(imagemechant, 5, 1, 1800, 340);
entityList.push(monster);

const imgkami = new Image();
imgkami.src = "/images/Sprite-first.png";

const monster2 = new KamikazeEnemy(imgkami, 20, 999, 1800, 340);
entityList.push(monster2);
const monster3 = new KamikazeEnemy(imgkami, 20, 999, 1800, 340);
entityList.push(monster3);
const monster4 = new KamikazeEnemy(imgkami, 20, 999, 1800, 340);
entityList.push(monster4);
const monster5 = new KamikazeEnemy(imgkami, 20, 999, 1800, 340);
entityList.push(monster5);
const monster6 = new KamikazeEnemy(imgkami, 20, 999, 1800, 340);
entityList.push(monster6);
const monster7 = new KamikazeEnemy(imgkami, 20, 999, 1800, 340);
entityList.push(monster7);

let x = 0,
  y = 0,
  xSpeed = 0,
  ySpeed = 0;

let speed = 10;

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawList.forEach((draw) => draw.render(context));
  entityList.forEach((entity) => entity.render(context));

  context.drawImage(image, x, y);

  requestAnimationFrame(render);
}

function update() {
  moveMonster();
  entityList.forEach((entity) => entity.move());
  isInContact(entityList);
}

function isInContact(entitylist) {
  entitylist.forEach((entity) => {
    if (
      entity.x < x + image.width &&
      entity.x + entity.image.width > x &&
      entity.y < y + image.height &&
      entity.y + entity.image.height > y &&
      canBeTouched
    ) {
      console.log("collision");
      canBeTouched = false;
      setTimeout(() => {
        canBeTouched = true;
      }, 1000);
    }
  });
}

function moveMonster() {
  y += ySpeed;
  if (y < 0) {
    y = 0;
  } else if (y + image.height > canvas.height) {
    y = canvas.height - image.height;
  }

  x += xSpeed;
  if (x < 0) {
    x = 0;
  } else if (x + image.width > canvas.width) {
    x = canvas.width - image.width;
  }
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      xSpeed = speed;
      break;
    case "ArrowLeft":
      xSpeed = -speed;
      break;
    case "ArrowUp":
      ySpeed = -speed;
      break;
    case "ArrowDown":
      ySpeed = speed;
      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowRight":
    case "ArrowLeft":
      xSpeed = 0;
      break;
    case "ArrowUp":
    case "ArrowDown":
      ySpeed = 0;
      break;
  }
});

setInterval(update, 1000 / 60);
