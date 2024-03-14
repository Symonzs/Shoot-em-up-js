import assert from "node:assert/strict";
import { velocity } from "../coordCalculator.js";
import { describe, it } from "node:test";
import BasicShooter from "../BasicShooter.js";
import { getRenderValues } from "../GetInitialValues.js";
import Joueur from "../joueur.js";

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

describe("BasicWeapon", () => {
  it("should fire", (done) => {
    const player = new Joueur(5, 10, rendervalues, renderValuesProj);
    player.shoot();
    assert.strictEqual(player.missileList.length, 1);
  });
});
