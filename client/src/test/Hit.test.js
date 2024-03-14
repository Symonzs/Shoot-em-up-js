import assert from "node:assert/strict";
import { describe, it } from "node:test";
import BasicShooter from "../BasicShooter.js";
import { getRenderValues } from "../GetInitialValues.js";
import FriendlyBasicBullet from "../FriendlyBasicBullet.js";
import detectCollision from "../hit.js";
import Joueur from "../joueur.js";
import LinearMissile from "../LinearMissile.js";

const artificialImageValues = {
  path: "path",
  width: 80,
  height: 80,
};

const rendervalues = getRenderValues(artificialImageValues, 500, 500);

const renderValuesProj = {
  x: rendervalues.x,
  y: rendervalues.y,
  width: rendervalues.width,
  height: rendervalues.height,
};

describe("hit", () => {
  it("should detect when an ennemy is hit", () => {
    const artificialImageValues = {
      path: "/images/basicbullet.png",
      width: 100,
      height: 100,
    };
    const friendlyRenderValues = getRenderValues(
      artificialImageValues,
      500,
      500
    );
    let basicShooter = new BasicShooter(
      15,
      10,
      rendervalues,
      renderValuesProj,
      {
        xSpeed: 1,
        ySpeed: 0,
        time: 10,
        xSpeed1: 0,
        ySpeed1: 1,
        transitionTime: 10,
      }
    );
    assert.strictEqual(basicShooter.hp, 10);
    const lmissile = new FriendlyBasicBullet(5, 5, friendlyRenderValues);
    detectCollision(lmissile, basicShooter);
    assert.strictEqual(basicShooter.hp, 9);
    clearInterval(basicShooter.canFire);
  });
  it("should not detect a hit when the ennemy is not hit", () => {
    const artificialImageValues = {
      path: "/images/basicbullet.png",
      width: 100,
      height: 100,
    };
    const friendlyRenderValues = getRenderValues(
      artificialImageValues,
      100,
      100
    );
    let basicShooter = new BasicShooter(
      15,
      10,
      rendervalues,
      renderValuesProj,
      {
        xSpeed: 1,
        ySpeed: 0,
        time: 10,
        xSpeed1: 0,
        ySpeed1: 1,
        transitionTime: 10,
      }
    );
    assert.strictEqual(basicShooter.hp, 10);
    const lmissile = new FriendlyBasicBullet(5, 5, friendlyRenderValues);
    detectCollision(lmissile, basicShooter);
    assert.strictEqual(basicShooter.hp, 10);
    clearInterval(basicShooter.canFire);
  });
  it("should detect when the player is hit & shoudlnt get it while in iframes", () => {
    const artificialImageValues = {
      path: "/images/basicbullet.png",
      width: 100,
      height: 100,
    };
    const player = new Joueur(5, 10, rendervalues);
    const friendlyRenderValues = getRenderValues(
      artificialImageValues,
      500,
      500
    );
    const lmissile = new LinearMissile(
      "/images/basicbullet.png",
      10,
      999,
      friendlyRenderValues
    );
    console.log(player.hitboxCoordinates);
    console.log(lmissile.hitboxCoordinates);
    assert.strictEqual(player.hp, 10);
    detectCollision(lmissile, player);
    assert.strictEqual(player.hp, 9);
    detectCollision(lmissile, player);
    assert.strictEqual(player.hp, 9);
  });

  it("should not detect a hit when the player is not hit", () => {
    const artificialImageValues = {
      path: "/images/basicbullet.png",
      width: 100,
      height: 100,
    };
    const player = new Joueur(5, 10, rendervalues);
    const friendlyRenderValues = getRenderValues(
      artificialImageValues,
      300,
      300
    );
    const lmissile = new LinearMissile(
      "/images/basicbullet.png",
      10,
      999,
      friendlyRenderValues
    );
    console.log(player.hitboxCoordinates);
    console.log(lmissile.hitboxCoordinates);
    assert.strictEqual(player.hp, 10);
    detectCollision(lmissile, player);
    assert.strictEqual(player.hp, 10);
  });
});
