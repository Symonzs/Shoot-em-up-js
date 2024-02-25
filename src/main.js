import Entity from "./Entity.js";
import KamikazeEnemy from "./KamikazeEnemy.js";
import BasicShooter from "./BasicShooter.js";
import Joueur from "./joueur.js";
import getInitialImageValues from "./GetInitialImage.js";

const canvas = document.querySelector(".gameCanvas"),
  context = canvas.getContext("2d"),
  canvasResizeObserver = new ResizeObserver(() => resampleCanvas());
 


export const canvase = canvas;
export const contexte = context;

canvasResizeObserver.observe(canvas);

/*function getInitialImageValues(path) {
  const image = new Image();
  image.src = path;
  const imageInfo = {
    "path": path,
    "width": image.width,
    "height": image.height
  }
  return imageInfo;

}*/


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
const joueur = new Joueur(getInitialImageValues(image.src), 5, 10, 0, 0);

const imagemechant = "/images/Sprite-0002.png";

const monster = new BasicShooter(getInitialImageValues(imagemechant), 5, 1, 1800, 340, 0, 70, getInitialImageValues("/images/basicbullet.png"));
entityList.push(monster);

const HPBar = new Image();
HPBar.src = "/images/hpbar.png";
const HPButNormal = new Image();
HPButNormal.src = "/images/hp.png";
/*
const imgkami = "/images/Sprite-first.png";

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
  //console.log(values.imageInfo.width, values.imageInfo.height);
  context.drawImage(image, values.x - (values.imageInfo.width/2), values.y - (values.imageInfo.height/2));
  console.log(values.x);
  //context.drawImage(image, values.x, values.y);
}

function renderHP() {
  const startingX = 10;
  const startingY = 10;
  context.drawImage(HPBar, startingX, startingY);
  const borderWidth = 7;
  const borderHeight = 5;
  for (let i = 0; i < joueur.hp; i++) {
    context.drawImage(HPButNormal, startingX+(borderWidth+i*47),startingY+borderHeight);
  }
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
  renderHP();
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
