import Joueur from "../joueur.js";
import LinearMissile from "../LinearMissile.js";
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('joueur', () => {
    it('should have the right amount of health', () => {
        const artificialImage = {
            "path": "path",
            "width": 80,
            "height": 80
          }
        const player = new Joueur(artificialImage, 5, 10, 0, 0);
        const bullet = new LinearMissile(artificialImage, 5, 10, 0, 0);
        player.hit(bullet);
        assert.strictEqual(player.hp, 9);
    });
});