import { describe, it } from "node:test";
import assert from "node:assert/strict";
import FriendlyBasicBullet from "../FriendlyBasicBullet.js";
import FriendlyPlasmaBullet from "../FriendlyPlasmaBullet.js";
import { getRenderValues } from "../GetInitialValues.js";

const artificialImageValues = {
  path: "/images/basicbullet.png",
  width: 100,
  height: 100,
};

const rendervalues = getRenderValues(artificialImageValues, 500, 500);

describe("FriendlyPlasmaBullet", () => {
  it("should move correctly", () => {
    const lmissile = new FriendlyPlasmaBullet(5, 5, rendervalues);
    const initialXPosition = lmissile.renderCoordinates.x;
    const initialYPosition = lmissile.renderCoordinates.y;
    lmissile.move();
    assert.strictEqual(
      lmissile.renderCoordinates.x,
      initialXPosition + lmissile.speedX
    );
    assert.notEqual(lmissile.renderCoordinates.y, initialYPosition);
  });
});
