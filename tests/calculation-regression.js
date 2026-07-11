#!/usr/bin/env node
// Regression tests for the framework-independent calculation module.
// Run with: node tests/calculation-regression.js

const assert = require('node:assert/strict');
const path = require('node:path');
const calculations = require(path.join(__dirname, '..', 'src', 'calculations.js'));

const walls = calculations.calculateWallAreas({
  width: 8, wallH: 2.6, ridgeH: 4.4, depth: 12, openings: 8,
});
assert.equal(walls.rectangularArea, 104);
assert.ok(Math.abs(walls.gableArea - 14.4) < 1e-9);
assert.ok(Math.abs(walls.grossArea - 118.4) < 1e-9);
assert.ok(Math.abs(walls.netArea - 110.4) < 1e-9);

const footing = calculations.calculateFootingUplift({
  width: 0.9, length: 0.9, baseDepth: 0.7, thickness: 0.35,
  soilDensity: 1700, tension: 1000,
});
assert.equal(footing.footingThickness, 0.35);
assert.equal(footing.soilCover, 0.35);
assert.equal(footing.footingWeight, 680.4);
assert.ok(footing.soilWeight > 0);
assert.ok(footing.FS > 0);

// No soil cover means there is no soil-cone resistance to add.
const shallowFooting = calculations.calculateFootingUplift({
  width: 0.9, length: 0.9, baseDepth: 0.35, thickness: 0.35,
  soilDensity: 1700, tension: 1000,
});
assert.equal(shallowFooting.soilCover, 0);
assert.equal(shallowFooting.soilWeight, 0);

// The two slopes are separate rectangles: complete panels must be purchased.
assert.equal(calculations.calculateRoofPanelCount({
  depth: 12, slopeLength: 4.386, panelWidth: 1.22, panelHeight: 2.44,
}), 40);

assert.equal(calculations.calculateRoofPanelCount({
  depth: 12, slopeLength: 4.386, panelWidth: 0, panelHeight: 2.44,
}), 0);

assert.equal(calculations.clamp(80, 1, 60), 60);

console.log('OK — regresiones de cálculo verificadas.');
