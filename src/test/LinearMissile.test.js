
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import LinearMissile from '../LinearMissile.js';

describe('LinearMissile', () => {
    it('should move correctly', () => {
        const artificialImage = {
            "path": "path",
            "width": 80,
            "height": 80
          }
        const lmissile = new LinearMissile(artificialImage, 5, 10, 500, 500);
        const initialXPosition = lmissile.x;
        const initialYPosition = lmissile.y;
        lmissile.move();
        assert.strictEqual(lmissile.x, initialXPosition - lmissile.speed);
        assert.strictEqual(lmissile.y, initialYPosition );
    });
    
});