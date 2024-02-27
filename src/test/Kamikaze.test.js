
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
        const speedX = kamikaze.speedX;
        const speedY = kamikaze.speedY;
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