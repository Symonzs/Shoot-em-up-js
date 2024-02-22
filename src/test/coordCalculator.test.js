import assert from 'node:assert/strict';
import { velocity } from '../coordCalculator.js';
import { describe, it } from 'node:test';

describe('coordCalculator', () => {
  it('should return 0 when distance is 0', () => {
    assert.strictEqual((velocity(0,13,5)), 0);
  });

 /* it('should return positive speed for positive distance', () => {
    const joueur = new Joueur(image, 5, 1, 0, 0);
    assert(joueur.velocityX(20) > 0);
  });

  it('should return negative speed for negative distance', () => {
    const joueur = new Joueur(image, 5, 1, 0, 0);
    assert(joueur.velocityX(-20) < 0);
  });*/

  // Ajoutez d'autres tests selon vos besoins
});
