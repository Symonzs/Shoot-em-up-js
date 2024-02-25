
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import BounceDiagonalMissile from '../BounceDiagonalMissile.js';

describe('BounceDiagonalMissile', () => {
    it('should bounce correctly', () => {
        const artificialImage = {
            "path": "path",
            "width": 80,
            "height": 80
          }
        const dmissile = new BounceDiagonalMissile(artificialImage, 15, 10,1, 500, 500);
        const initialyspeed = dmissile.speedY;
        for (let i = 0; i < 60; i++) {
            dmissile.move();
        }
        assert.strictEqual(initialyspeed, -dmissile.speedY);
    });
    
});