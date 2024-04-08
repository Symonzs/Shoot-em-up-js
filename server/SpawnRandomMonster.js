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
  return new BasicShooter(
    5,
    60,
    10,
    getRandomArbitrary(1200, 1400),
    getRandomArbitrary(200, 700),
    mouvement
  );
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

  return new BounceShooter(
    5,
    60,
    10,
    getRandomArbitrary(1200, 1400),
    getRandomArbitrary(200, 700),
    mouvement
  );
}

function generateCurvedShooter() {
  const mouvement = {
    xSpeed: 1,
    ySpeed: getRandomArbitrary(-1, 1),
    time: getRandomArbitrary(1000, 3000),
    xSpeed1: 0,
    ySpeed1: getRandomArbitrary(-2, 2),
    transitionTime: getRandomArbitrary(5000, 10000),
  };

  return new CurvedShooter(
    5,
    60,
    20,
    getRandomArbitrary(1200, 1400),
    getRandomArbitrary(200, 700),
    mouvement
  );
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
  return new HomingShooter(
    5,
    10,
    25,
    getRandomArbitrary(1200, 1400),
    getRandomArbitrary(200, 700),
    mouvement
  );
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
  return new SkullShooter(
    5,
    15,
    50,
    getRandomArbitrary(1200, 1400),
    getRandomArbitrary(200, 700),
    mouvement
  );
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

  return new SniperShooter(
    5,
    200,
    5,
    getRandomArbitrary(1200, 1400),
    getRandomArbitrary(200, 700),
    mouvement
  );
}

export default function spawnRandomMonster() {
  let monster;
  const prob = generatePercentage();
  if (prob < 50) {
    monster = generateBasicShooter();
  } else if (prob < 70) {
    monster = generateBounceShooter();
  } else if (prob < 80) {
    monster = generateSniperShooter();
  } else if (prob < 90) {
    monster = generateHomingShooter();
  } else if (prob < 95) {
    monster = generateCurvedShooter();
  } else {
    monster = generateSkullShooter();
  }
  return monster;
}
