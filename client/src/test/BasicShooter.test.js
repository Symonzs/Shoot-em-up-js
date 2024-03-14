import assert from 'node:assert/strict';
import { velocity } from '../coordCalculator.js';
import { describe, it } from 'node:test';
import BasicShooter from '../BasicShooter.js';
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



describe('BasicShooter', () => {
  it('should shoot a missile after 5 sec', (done) => {
    let basicShooter = new BasicShooter(15, 10, rendervalues, renderValuesProj, {"xSpeed": 1, "ySpeed": 0, "time": 10, "xSpeed1" : 0, "ySpeed1" : 1, "transitionTime" : 10});
    const testTimeout = setTimeout(() => {
      assert.strictEqual(basicShooter.missileList.length, 1);
      done();
    }, 5000);
    clearTimeout(testTimeout);
    clearInterval(basicShooter.canFire);
  });

});