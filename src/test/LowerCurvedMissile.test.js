import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import LowerCurvedMissile from '../LowerCurvedMissile.js';
import { getRenderValues } from "../GetInitialValues.js";

const artificialImageValues = {
    "path": "/images/basicbullet.png",
    "width": 100,
    "height": 100
}

const rendervalues = getRenderValues(artificialImageValues, 500, 500)

describe('LowerCurvedMissile', () => {
    it('should move correctly', () => {
        const lmissile = new LowerCurvedMissile(artificialImageValues.path, 5, 5, rendervalues);
        const initialXPosition = lmissile.renderCoordinates.x;
        const initialYPosition = lmissile.renderCoordinates.y;
        lmissile.move();
        assert.strictEqual(lmissile.renderCoordinates.x, initialXPosition - lmissile.speed);
        assert.strictEqual(lmissile.renderCoordinates.y, initialYPosition + Math.sin(this.x * this.frequency) * this.amplitude);
    });
    
});