import assert from "node:assert/strict";
import { velocity } from "../coordCalculator.js";
import { describe, it } from "node:test";
import SkullShooter from "../SkullShooter.js";
import { getRenderValues } from "../GetInitialValues.js";

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

describe("SkullShooter", () => {
  it("should be initalized", () => {
    let skullShooter = new SkullShooter(
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
    assert.strictEqual(skullShooter.speed, 15);
    clearInterval(skullShooter.canFire);
  });

  it("should change the image accordingly", () => {
    let skullShooter = new SkullShooter(
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
    assert.strictEqual(skullShooter.image, "/images/ships/skull-1.png");
    skullShooter.changeImage(2);
    assert.strictEqual(skullShooter.image, "/images/ships/skull-2.png");
    clearInterval(skullShooter.canFire);
  });

  it("should update the hitboxes accordingly", () => {
    let skullShooter = new SkullShooter(
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
    const hitBoxImage1 = skullShooter.hitboxCoordinates;
    skullShooter.changeImage(2);
    assert.notStrictEqual(hitBoxImage1, skullShooter.hitboxCoordinates);
    clearInterval(skullShooter.canFire);
  });

  it("should be able to shoot", () => {
    let skullShooter = new SkullShooter(
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
    assert.strictEqual(skullShooter.missileList.length, 0);
    skullShooter.shoot();
    assert.strictEqual(skullShooter.missileList.length, 1);
    clearInterval(skullShooter.canFire);
  });
});
