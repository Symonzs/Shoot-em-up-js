import assert from 'node:assert/strict';
import { velocity } from '../coordCalculator.js';
import { describe, it } from 'node:test';
import SkullShooter from '../SkullShooter.js';
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

describe('SkullShooter', () => {
    it('should be initalized', () => {
        let skullShooter = new SkullShooter(
            "speed": 15,
            "hp": 10,
            "renderCoordinates": rendervalues, 
            "renderCoordinatesProj": renderValuesProj, 
            "movement": {
                "xSpeed": 1, 
                "ySpeed": 0, 
                "time": 10, 
                "xSpeed1" : 0, 
                "ySpeed1" : 1, 
                "transitionTime" : 10});          
    })
});