import BasicShooter from "./entities/BasicShooter.js";
import BounceShooter from "./entities/BounceShooter.js";
import CurvedShooter from "./entities/CurvedShooter.js";
import SniperShooter from "./entities/SniperShooter.js";
import HomingShooter from "./entities/HomingShooter.js";
import SkullShooter from "./entities/SkullShooter.js";
import {
  generatePercentage,
  getRandomArbitrary,
} from "./utils/GenerateRandomValues.js";
import KamikazeEnemy from "./entities/KamikazeEnemy.js";
const canvasHeight = 1500;
const canvasWidth = 800;

function generateBasicShooter() {
  const mouvement = {
    xSpeed: getRandomArbitrary(-3, 3),
    ySpeed: getRandomArbitrary(-3, 3),
    time: getRandomArbitrary(1000, 6000),
    xSpeed1: 0,
    ySpeed1: getRandomArbitrary(-4, 4),
    transitionTime: getRandomArbitrary(5000, 10000),
  };
 // const  y= 
   // canvasHeight / 2 + getRandomArbitrary(-(canvasHeight / 8), canvasHeight / 8);
  return new BasicShooter(5, 60, 10, 1350, 400, mouvement);
}

function generateBounceShooter() {
  const mouvement = {
    xSpeed: getRandomArbitrary(-3, 3),
    ySpeed: getRandomArbitrary(-3, 3),
    time: getRandomArbitrary(1000, 6000),
    xSpeed1: getRandomArbitrary(-1, 1),
    ySpeed1: getRandomArbitrary(-4, 4),
    transitionTime: getRandomArbitrary(5000, 10000),
  };
  const y =
    canvasWidth / 2 + getRandomArbitrary(-(canvasWidth / 8), canvasWidth / 8);
  return new BounceShooter(5, 60, 10, canvasHeight, y, mouvement);
}

function generateCurvedShooter() {
  const mouvement = {
    xSpeed: 1,
    ySpeed: getRandomArbitrary(-1, 1),
    time: getRandomArbitrary(1000, 6000),
    xSpeed1: 0,
    ySpeed1: getRandomArbitrary(-2, 2),
    transitionTime: getRandomArbitrary(5000, 10000),
  };
  const y =
    canvasWidth / 4 + getRandomArbitrary(-(canvasWidth / 8), canvasWidth / 8);
  return new CurvedShooter(5, 60, 20, canvasHeight, y, mouvement);
}

function generateHomingShooter() {
  const mouvement = {
    xSpeed: getRandomArbitrary(1, 2),
    ySpeed: getRandomArbitrary(-1, 1),
    time: getRandomArbitrary(1000, 6000),
    xSpeed1: 0,
    ySpeed1: getRandomArbitrary(-2, 2),
    transitionTime: getRandomArbitrary(5000, 10000),
  };
  const y =
    10 * (canvasWidth / 16) +
    getRandomArbitrary(-(canvasWidth / 16), canvasWidth / 16);
  return new HomingShooter(5, 60, 25, canvasHeight, y, mouvement);
}

function generateKamikaze() {
  const speed = getRandomArbitrary(8, 16);
  return new KamikazeEnemy(speed, canvasHeight, canvasHeight / 2);
}

function generateSkullShooter() {
  const mouvement = {
    xSpeed: getRandomArbitrary(2, 3),
    ySpeed: 0,
    time: getRandomArbitrary(1000, 6000),
    xSpeed1: 0,
    ySpeed1: getRandomArbitrary(-2, 2),
    transitionTime: getRandomArbitrary(5000, 10000),
  };
  const y =
    canvasWidth / 2 +
    getRandomArbitrary(-(canvasWidth / 2) + 10, canvasWidth / 2 - 10);
  return new SkullShooter(5, 60, 50, canvasHeight, y, mouvement);
}

function generateSniperShooter() {
  const mouvement = {
    xSpeed: getRandomArbitrary(1, 2),
    ySpeed: 0,
    time: getRandomArbitrary(1000, 6000),
    xSpeed1: 0,
    ySpeed1: getRandomArbitrary(-2, 2),
    transitionTime: getRandomArbitrary(5000, 10000),
  };
  const y = canvasWidth / 8 + getRandomArbitrary(0, canvasWidth / 4);
  return new SniperShooter(5, 200, 5, canvasHeight, y, mouvement);
}

export default function spawnRandomMonster() {
  let monster;
  const prob = generatePercentage();
  if (prob < 50) {
    monster = generateBasicShooter();
  } else if (prob < 70) {
    monster = generateBounceShooter();
  } else if (prob < 80){
    monster = generateSniperShooter();
  }  else if (prob < 90) {
    monster = generateHomingShooter();
  } else if (prob < 95) {
    monster = generateCurvedShooter();
  } else {
    monster = generateSkullShooter();
  }
  return monster;
}
