import assert from 'node:assert/strict';
import Joueur from '../Joueur.js';

const image = new Image();
image.src = "/images/monster.png";

describe('Joueur.velocityX', () => {
  it('should return 0 when distance is 0', () => {
    const joueur = new Joueur(image, 5, 1, 0, 0);
    assert.strictEqual(joueur.velocityX(0), 0);
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
