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

const varProjX = 20;
const varProjY = 20;

const renderValuesProj = {
  "x": rendervalues.x,
  "y": rendervalues.y,
  "width": rendervalues.width + varProjX,
  "height": rendervalues.height + varProjY
}



describe('Tire bien !', () => {
  it('should shoot a missile after 5 sec', (done) => {
    let basicShooter = new BasicShooter(15, 10, rendervalues, renderValuesProj, varProjX, varProjY);
    const testTimeout = setTimeout(() => {
      assert.strictEqual(basicShooter.missileList.length, 1);
      done();
    }, 5000);
    clearTimeout(testTimeout);
    clearTimeout(basicShooter.canFire);
  });




});