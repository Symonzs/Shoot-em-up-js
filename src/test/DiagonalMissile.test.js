
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import DiagonalMissile from '../DiagonalMissile.js';

describe('DiagonalMissile', () => {
    it('should move correctly', () => {
        const artificialImage = {
            "path": "path",
            "width": 80,
            "height": 80
          }
        const dmissile = new DiagonalMissile(artificialImage, 15, 10,1, 500, 500);
        const initialXPosition = dmissile.x;
        const initialYPosition = dmissile.y;
        dmissile.move();
        assert.strictEqual(dmissile.x, initialXPosition - dmissile.speedX);
        assert.strictEqual(dmissile.y, initialYPosition + dmissile.speedY);
    });
    
});