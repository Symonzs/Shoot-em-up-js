import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getRenderValues } from "../GetInitialValues.js";
import Joueur from "../joueur.js";
import BurstWeapon from "../BurstWeapon.js";

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

describe("BurstWeapon", () => {
  it("should fire", (done) => {
    const player = new Joueur(5, 10, rendervalues, renderValuesProj);
    let weapon = new BurstWeapon(75, 1, 1000, renderValuesProj, 300, 3);
    player.changeWeapon(weapon);
    player.shoot();
    setTimeout(() => {
      assert.strictEqual(player.missileList.length, 3);
    }, 4000);
  });
});
