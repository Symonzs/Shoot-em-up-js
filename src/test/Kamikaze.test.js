
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import KamikazeEnemy from "../KamikazeEnemy.js";
import { getRenderValues } from "../GetInitialValues.js";

const artificialImageValues = {
  "path": "path",
  "width": 80,
  "height": 80
}

const rendervalues = getRenderValues(artificialImageValues, 500, 500)

describe('Kamikaze', () => {
    it('should move correctly', () => {
        const kamikaze = new KamikazeEnemy(5, 10, rendervalues);
        const initialXPosition = kamikaze.renderCoordinates.x;
        const initialYPosition = kamikaze.renderCoordinates.y;
        kamikaze.move();
        const angle = kamikaze.angle;
        const speedX = kamikaze.speedX;
        const speedY = kamikaze.speedY;
        console.log("initialXPosition:" + initialXPosition);
        console.log("angle:" + kamikaze.angle);
        console.log("speedX:" + kamikaze.speedX);
        console.log("renderCoordinates.x:" + kamikaze.renderCoordinates.x);
        assert.strictEqual(kamikaze.renderCoordinates.x, initialXPosition - speedX);
        assert.strictEqual(kamikaze.renderCoordinates.y, initialYPosition + speedY);
    });

    it('should reset position correctly', () => {
        const kamikaze = new KamikazeEnemy(5, 10, rendervalues);
        kamikaze.resetPosition();
        assert.notEqual(kamikaze.renderCoordinates.x, 500);
        assert.notEqual(kamikaze.renderCoordinates.y, 500);
    });
    
});