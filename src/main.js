import Entity from "./Entity.js";
import KamikazeEnemy from "./KamikazeEnemy.js";
import BasicShooter from "./BasicShooter.js";
import Joueur from "./joueur.js";

const canvas = document.querySelector(".gameCanvas"),
  context = canvas.getContext("2d"),
  canvasResizeObserver = new ResizeObserver(() => resampleCanvas());
 


export const canvase = canvas;
export const contexte = context;

canvasResizeObserver.observe(canvas);

function getInitialImageValues(path) {
  const image = new Image();
  image.src = path;
  const imageInfo = {
    "path": path,
    "width": image.width,
    "height": image.height
  }
  return imageInfo;

}


function resampleCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
let entityList = [];




requestAnimationFrame(render);

const image = new Image();
image.src = "/images/gentil.png";
image.addEventListener("load", (event) => {
  requestAnimationFrame(render);
});
const joueur = new Joueur(getInitialImageValues(image.src), 5, 1, 0, 0);

const imagemechant = "/images/Sprite-0002.png";

const monster = new BasicShooter(getInitialImageValues(imagemechant), 5, 1, 1800, 340, 0, 70);
entityList.push(monster);

const imgkami = "/images/Sprite-first.png";

/*
const monster2 = new KamikazeEnemy(getInitialImageValues(imgkami), 20, 999, 1800, 340);
entityList.push(monster2);
const monster3 = new KamikazeEnemy(getInitialImageValues(imgkami), 20, 999, 1800, 340);
entityList.push(monster3);
const monster4 = new KamikazeEnemy(getInitialImageValues(imgkami), 20, 999, 1800, 340);
entityList.push(monster4);
const monster5 = new KamikazeEnemy(getInitialImageValues(imgkami), 20, 999, 1800, 340);
entityList.push(monster5);
const monster6 = new KamikazeEnemy(getInitialImageValues(imgkami), 20, 999, 1800, 340);
entityList.push(monster6);
const monster7 = new KamikazeEnemy(getInitialImageValues(imgkami), 20, 999, 1800, 340);
entityList.push(monster7);
*/

canvas.addEventListener("mousemove", (event) => {
  if (event.offsetX != joueur.latestCursorX) {
    joueur.latestCursorX = event.offsetX;
  }
  if (event.offsetY != joueur.latestCursorY) {
    joueur.latestCursorY = event.offsetY;
  }
});

function drawEntity(entity) {
  const values = entity.render();
  const image = new Image();
  image.src = entity.image.path;
  context.drawImage(image, values.x, values.y);
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const playerValues = joueur.render();
  const playerImage = new Image();
  playerImage.src = joueur.image.path;
  context.drawImage(playerImage, playerValues.x - (playerValues.imageInfo.width / 2), playerValues.y - (playerValues.imageInfo.height / 2));
  entityList.forEach((entity) => {
    drawEntity(entity);
    entity.missileList.forEach((missile) => {
      drawEntity(missile);
    });
  });

  

  requestAnimationFrame(render);
}

function update() {
  joueur.move();
  entityList.forEach((entity) => entity.move());
  isInContact(entityList);
}

function isInContact(entitylist) {
  entitylist.forEach((entity) => {
    joueur.hit(entity);
    entity.missileList.forEach((missile) => {
      joueur.hit(missile);
  });
});
}
/*
function hit(entity) {
  if (
    entity.x < joueur.x + joueur.image.width &&
    entity.x + entity.image.width > joueur.x &&
    entity.y < joueur.y + joueur.image.height &&
    entity.y + entity.image.height > joueur.y &&
    canBeTouched
  ) {
    console.log("collision");
    canBeTouched = false;
    setTimeout(() => {
      canBeTouched = true;
    }, 1000);
  }
}
*/

setInterval(update, 1000 / 60);
