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
    it('should move correctly',() => {
      const player = new Joueur(5, 10, rendervalues);

      player.latestCursorX = player.renderCoordinates.x + player.renderCoordinates.width/2;
      player.latestCursorY = player.renderCoordinates.y + player.renderCoordinates.height/2;
      player.move();

      assert.strictEqual(player.renderCoordinates.x, 0);
      assert.strictEqual(player.renderCoordinates.y, 0);

      player.latestCursorX = 1000;
      player.latestCursorY = 1000;
      player.move();

      assert.strictEqual(player.renderCoordinates.x, 16);
      assert.strictEqual(player.renderCoordinates.y, 16);
      
      player.latestCursorX = 1000;
      player.latestCursorY = 0;
      player.move();

      assert.strictEqual(player.renderCoordinates.x, 32);
      assert.strictEqual(player.renderCoordinates.y, 9.4);
    });
    it('should shoot',() => {
          const player = new Joueur(5, 10, rendervalues, rendervalues);
          player.shoot();
          assert.strictEqual(player.missileList.length, 1);
    });
    
    it('should shoot correctly',() => {
        const player = new Joueur(5, 10, rendervalues, rendervalues);
        player.shoot();
        const initialMissilePositions= {
            "x": player.renderCoordinates.x + player.varProjX,
            "y": player.renderCoordinates.y + player.varProjY,
        }
        console.log(initialMissilePositions);
        assert.strictEqual(player.missileList[0].renderCoordinates.x, initialMissilePositions.x);
        player.move();
        assert.strictEqual(player.missileList[0].renderCoordinates.x, initialMissilePositions.x + player.missileList[0].speed);
  });
});