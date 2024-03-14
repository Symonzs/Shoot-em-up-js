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
  "width": rendervalues.width,
  "height": rendervalues.height
}



describe('LaserShooter', () => {
  it('should shoot a missile after 5 sec', (done) => {
    let laserShooter = new LaserShooter(15, 10, rendervalues, renderValuesProj, {"xSpeed": 1, "ySpeed": 0, "time": 10, "xSpeed1" : 0, "ySpeed1" : 1, "transitionTime" : 10});
    const testTimeout = setTimeout(() => {
      assert.strictEqual(laserShooter.missileList.length, 1);
      done();
    }, 5000);
    clearTimeout(testTimeout);
    clearTimeout(laserShooter.canFire);
  });




});