
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import KamikazeEnemy from "../KamikazeEnemy.js";

describe('Kamikaze', () => {
    it('should move correctly', () => {
        const artificialImage = {
            "path": "path",
            "width": 80,
            "height": 80
          }
        const kamikaze = new KamikazeEnemy(artificialImage, 5, 10, 500, 500);
        const initialXPosition = kamikaze.x;
        const initialYPosition = kamikaze.y;
        kamikaze.move();
        const angle = kamikaze.angle;
        const speedX = kamikaze.speedX;
        const speedY = kamikaze.speedY;
        assert.strictEqual(kamikaze.x, initialXPosition - speedX);
        assert.strictEqual(kamikaze.y, initialYPosition + speedY);
    });

    it('should reset position correctly', () => {
        const artificialImage = {
            "path": "path",
            "width": 80,
            "height": 80
          }
        const kamikaze = new KamikazeEnemy(artificialImage, 5, 10, 500, 500);
        kamikaze.resetPosition();
        assert.notEqual(kamikaze.x, 500);
        assert.notEqual(kamikaze.y, 500);
    });
    
});