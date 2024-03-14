import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import BounceDiagonalMissile from '../BounceDiagonalMissile.js';
import { getRenderValues } from "../GetInitialValues.js";

const artificialImageValues = {
    "path": "/images/basicbullet.png",
    "width": 100,
    "height": 100
}

const rendervalues = getRenderValues(artificialImageValues, 500, 500)

describe('BounceDiagonalMissile', () => {
    it('should bounce correctly', () => {
        const dmissile = new BounceDiagonalMissile(artificialImageValues.path, 10, 10, 1, rendervalues);
        const initialyspeed = dmissile.speedY;
        for (let i = 0; i < 100; i++) {
            dmissile.move();
        }
        assert.strictEqual(initialyspeed, -dmissile.speedY);
    });
    
});