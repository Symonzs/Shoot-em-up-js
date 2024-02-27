import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import LaserMissile from '../LaserMissile.js';
import { getRenderValues } from "../GetInitialValues.js";

const artificialImageValues = {
    "path": "/images/basicbullet.png",
    "width": 2000,
    "height": 100
}

const rendervalues = getRenderValues(artificialImageValues, 500, 500)

describe('LinearMissile', () => {
    it('should move correctly', () => {
        const lmissile = new LaserMissile(artificialImageValues.path,5, rendervalues);
        const initialXPosition = lmissile.renderCoordinates.x;
        const initialYPosition = lmissile.renderCoordinates.y;
        lmissile.move(500,480);
        assert.strictEqual(lmissile.renderCoordinates.x, 500);
        assert.strictEqual(lmissile.renderCoordinates.y, 480);
    });
0});