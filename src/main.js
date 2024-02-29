import Entity from "./Entity.js";
import KamikazeEnemy from "./KamikazeEnemy.js";
import BasicShooter from "./BasicShooter.js";
import Joueur from "./joueur.js";
import {getInitialImageValues, getHitBoxValues, getRenderValues, getProjectileRenderValues} from "./GetInitialValues.js";
import LaserShooter from "./LaserShooter.js";
import detectCollision from './hit.js';
import CurvedShooter from "./CurvedShooter.js";

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


const image = new Image();
image.src = "/images/gentil.png";

const joueurImageValues = getInitialImageValues("/images/gentil.png");
const joueurProjImageValues = getInitialImageValues("/images/friendlybasicbullet.png");
const joueur = new Joueur(5, 10, getRenderValues(joueurImageValues, 0, 0), getProjectileRenderValues(joueurProjImageValues));
requestAnimationFrame(render);




const basicShooterImageValues = getInitialImageValues("/images/basicshooter.png");
const basicShooterProjImageValues = getInitialImageValues("/images/basicbullet.png");
const laserShooterImageValues = getInitialImageValues("/images/basicshooter.png");
const laserShooterProjImageValues = getInitialImageValues("/images/redlaser.png");

const basicShooter = new BasicShooter(2, 10, getRenderValues(basicShooterImageValues, 1300, 100), getProjectileRenderValues(basicShooterProjImageValues));
entityList.push(basicShooter);

const laserShooter = new LaserShooter(2, 10, getRenderValues(laserShooterImageValues, 1500, 100), getProjectileRenderValues(laserShooterProjImageValues));
entityList.push(laserShooter)

const curvedShooter = new CurvedShooter(2, 10, getRenderValues(laserShooterImageValues, 1600, 500), getProjectileRenderValues(basicShooterProjImageValues));
entityList.push(curvedShooter)



const HPBar = new Image();
HPBar.src = "/images/hpbar.png";
const HPButNormal = new Image();
HPButNormal.src = "/images/hp.png";

const imgkami = "/images/Sprite-first.png";
const sharkImageValues = getInitialImageValues(imgkami);


for (let i = 0; i < 1; i++) {
  const monster = new KamikazeEnemy(15, 999, getRenderValues(sharkImageValues, 1800, 340));
  entityList.push(monster);
}
canvas.addEventListener("mousemove", (event) => {
  if (event.offsetX != joueur.latestCursorX) {
    joueur.latestCursorX = event.offsetX;
  }
  if (event.offsetY != joueur.latestCursorY) {
    joueur.latestCursorY = event.offsetY;
  }
});

canvas.addEventListener("mouseenter", (event) => {
  if (event.offsetX != joueur.latestCursorX) {
    joueur.latestCursorX = event.offsetX;
  }
  if (event.offsetY != joueur.latestCursorY) {
    joueur.latestCursorY = event.offsetY;
  }
});

let shootingSequence;
canvas.addEventListener("mousedown", (event) => {
  joueur.shoot();
  const shooting =setInterval(() => {
    joueur.shoot();
  }, 100);
  shootingSequence = shooting;
});

canvas.addEventListener("mouseup", (event) => {
  clearInterval(shootingSequence);
});

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

function drawEntity(entity) {
  const values = entity.render();
  const image = new Image();
  image.src = entity.image;
  context.drawImage(image, values.x, values.y);

  /*
  context.strokeStyle = "red";
  context.strokeRect(entity.hitboxCoordinates.x, entity.hitboxCoordinates.y, entity.hitboxCoordinates.width, entity.hitboxCoordinates.height);
  context.strokeStyle = "blue";
  context.strokeRect(entity.renderCoordinates.x, entity.renderCoordinates.y, entity.renderCoordinates.width, entity.renderCoordinates.height);
  context.strokeStyle = "black";
  */
}

function drawJoueur() {
  const playerValues = joueur.render();
  const playerImage = new Image();
  playerImage.src = playerValues.imageInfo;
  context.drawImage(playerImage, playerValues.x, playerValues.y);

  /*
  context.strokeStyle = "red";
  context.strokeRect(joueur.hitboxCoordinates.x, joueur.hitboxCoordinates.y, joueur.hitboxCoordinates.width, joueur.hitboxCoordinates.height);
  context.strokeStyle = "blue";
  context.strokeRect(joueur.renderCoordinates.x, joueur.renderCoordinates.y, joueur.renderCoordinates.width, joueur.renderCoordinates.height);
  context.strokeStyle = "black";
  */
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  drawJoueur();
  entityList.forEach((entity) => {
    drawEntity(entity);
    if (entity.missileList) {
      entity.missileList.forEach((missile) => {
        drawEntity(missile);
      });
    }
  });
  joueur.missileList.forEach((missile) => {
    drawEntity(missile);
  });
  renderHP();
  requestAnimationFrame(render);
}

function update() {
  joueur.move();

  //entityList = entityList.filter((entity) => entity.hp > 0);
  
  entityList.forEach((entity) => entity.move());
  isInContact(entityList);
  removeEntity();
}

function removeEntity() {
  entityList.forEach((entity, index) => {
      if (entity.hp < 1) {
          entity.renderCoordinates.x = -1000; 
          entity.renderCoordinates.y = -1000; 
          if (entity.missileList && entity.missileList.length < 1) {
              entityList.splice(index, 1);
          }
      }
  });
}


function isInContact(entitylist) {
  entitylist.forEach((entity) => {
    detectCollision(entity, joueur);
    joueur.missileList.forEach((missile) => {
      const hit = detectCollision(missile, entity);
      if (hit) {
        joueur.missileList.pop(missile);
      }
    });
    if (entity.missileList) {
      entity.missileList.forEach((missile) => {  
      joueur.hit(missile);
    });
    }
});
}

setInterval(update, 1000 / 60);
