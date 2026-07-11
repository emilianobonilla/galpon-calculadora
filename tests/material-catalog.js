#!/usr/bin/env node
const assert = require('node:assert/strict');
const path = require('node:path');

const catalog = require(path.join(__dirname, '..', 'src', 'material-catalog.js'));
const defaults = catalog.defaults();

assert.ok(defaults.length > 0);
assert.ok(catalog.group(defaults, 'C').length > 0);
assert.ok(catalog.group(defaults, 'Q').length > 0);
assert.ok(catalog.group(defaults, 'R').length > 0);
assert.ok(catalog.group(defaults, 'FLOOR').length > 0);

const normalized = catalog.normalize({
  id: ' nuevo ', type: 'FLOOR', label: ' Caño nuevo ', pesoKgM: '4.5',
  spanRef05: '2.1', pricePerMeter: '980',
});
assert.deepEqual(normalized, {
  id: 'nuevo', type: 'FLOOR', label: 'Caño nuevo', pesoKgM: 4.5,
  spanRef05: 2.1, pricePerMeter: 980,
});

const secondCopy = catalog.defaults();
defaults[0].label = 'modificado';
assert.notEqual(secondCopy[0].label, 'modificado');

console.log('OK — catálogo de materiales verificado.');
