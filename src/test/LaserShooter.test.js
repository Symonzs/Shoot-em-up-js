import assert from 'node:assert/strict';

import { describe, it } from 'node:test';
import LaserShooter from '../LaserShooter.js';
import { getRenderValues } from "../GetInitialValues.js";


const artificialImageValues = {
  "path": "path",
  "width": 80,
  "height": 80
}

const rendervalues = getRenderValues(artificialImageValues, 500, 500)


const renderValuesProj = {
  "x": rendervalues.x,
  "y": rendervalues.y,
  "width": rendervalues.width + varProjX,
  "height": rendervalues.height + varProjY
}



describe('Tire bien !', () => {
  it('should shoot a missile after 5 sec', (done) => {
    let laserShooter = new LaserShooter(15, 10, rendervalues, renderValuesProj);
    const testTimeout = setTimeout(() => {
      assert.strictEqual(laserShooter.missileList.length, 1);
      done();
    }, 5000);
    clearTimeout(testTimeout);
    clearTimeout(basicShooter.canFire);
  });




});