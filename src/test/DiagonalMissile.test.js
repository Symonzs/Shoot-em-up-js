
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import DiagonalMissile from '../DiagonalMissile.js';

const artificialImageValues = {
    "path": "/images/basicbullet.png",
    "width": 100,
    "height": 100
}

describe('DiagonalMissile', () => {
    it('should move correctly', () => {
        const dmissile = new DiagonalMissile("/images/basicbullet.png", 15, 10,1, artificialImageValues);
        const initialXPosition = dmissile.renderCoordinates.x;
        const initialYPosition = dmissile.renderCoordinates.y;
        dmissile.move();
        assert.strictEqual(dmissile.renderCoordinates.x, initialXPosition - dmissile.speedX);
        assert.strictEqual(dmissile.renderCoordinates.y, initialYPosition + dmissile.speedY);
    });
    
});