import assert from 'node:assert/strict';
import { velocity } from '../coordCalculator.js';
import { describe, it } from 'node:test';
import BasicShooter from '../BasicShooter.js';


describe('Tire bien !', () => {
  it('should shoot a missile after 5 sec', (done) => {

    const artificialImage = {
      "path": "path",
      "width": 80,
      "height": 80
    }
    let basicShooter = new BasicShooter(artificialImage, 15, 10, 0, 0, 0, 0);
    const testTimeout = setTimeout(() => {
      assert.strictEqual(basicShooter.missileList.length, 1);
      done();
    }, 5000);
    clearTimeout(testTimeout);
    clearTimeout(basicShooter.canFire);
  });




});