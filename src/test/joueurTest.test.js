import Joueur from "../joueur.js";
import LinearMissile from "../LinearMissile.js";
import { getRenderValues } from "../GetInitialValues.js";
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const artificialImageValues = {
    "path": "/images/gentil.png",
    "width": 100,
    "height": 100
}

const rendervalues = getRenderValues(artificialImageValues, 0, 0)

describe('joueur', () => {
    it('should have the right amount of health', () => {
        const player = new Joueur(5, 10, rendervalues);
        const bullet = new LinearMissile("/images/basicbullet.png", 10, 999, rendervalues);
        player.hit(bullet);
        assert.strictEqual(player.hp, 9);
    });
    
    it('should move correctly',() => {
      const player = new Joueur(5, 10, rendervalues);
      player.latestCursorX = player.renderCoordinates.x + player.renderCoordinates.width/2;
      player.latestCursorY = player.renderCoordinates.y + player.renderCoordinates.height/2;
      console.log(player.latestCursorX);
      console.log(player.latestCursorY);
      player.move();
      assert.strictEqual(player.renderCoordinates.x, 0);
      assert.strictEqual(player.renderCoordinates.y, 0);
    });
    /*
    it('should shoot correctly',() => {
          const player = new Joueur(artificialImage, 5, 10, 100, 100);
          player.shoot();
          assert.strictEqual(player.missileList.length, 1);
          assert.strictEqual(player.missileList[0].x, player.renderCoordinates.x);
    });
    */
});