import assert from "node:assert/strict";
import { velocity } from "../coordCalculator.js";
import { describe, it } from "node:test";

describe("coordCalculator", () => {
  it("should return 0 when distance is 0", () => {
    assert.strictEqual(velocity(0, 13, 10), 0);
  });

  it("should return positive speed for positive distance", () => {
    assert(velocity(20, 13, 10) > 0);
  });

  it("should return negative speed for negative distance", () => {
    assert(velocity(-20, 13, 10) < 0);
  });

  it("should return maxSpeed for distance > maxSpeed", () => {
    assert.strictEqual(velocity(2000, 13, 10), 13);
  });

  it("should return -maxSpeed for distance < -maxSpeed", () => {
    assert.strictEqual(velocity(-2000, 13, 10), -13);
  });
});
