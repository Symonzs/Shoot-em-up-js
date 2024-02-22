
import Entity from "./Entity.js";
import KamikazeEnemy from "./KamikazeEnemy.js";
import BasicShooter from "./BasicShooter.js";
import Joueur from "./Joueur.js";

const canvas = document.querySelector(".gameCanvas"),
  context = canvas.getContext("2d"),
  canvasResizeObserver = new ResizeObserver(() => resampleCanvas());
 


export const canvase = canvas;
export const contexte = context;

canvasResizeObserver.observe(canvas);




function resampleCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

let drawList = [];
let entityList = [];
let canBeTouched = true;




requestAnimationFrame(render);

const image = new Image();
image.src = "/images/gentil.png";
image.addEventListener("load", (event) => {
  requestAnimationFrame(render);
});
const joueur = new Joueur(image, 5, 1, 0, 0);
entityList.push(joueur);

const imagemechant = new Image();
imagemechant.src = "/images/Sprite-0002.png";

const monster = new BasicShooter(imagemechant, 5, 1, 1800, 340);
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
  y = 0;


function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawList.forEach((draw) => draw.render(context));
  entityList.forEach((entity) => entity.render(context));

  

  requestAnimationFrame(render);
}

function update() {
  entityList.forEach((entity) => entity.move());
  isInContact(entityList);
}

function isInContact(entitylist) {
  entitylist.forEach((entity) => {
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
  });
}


setInterval(update, 1000 / 60);
