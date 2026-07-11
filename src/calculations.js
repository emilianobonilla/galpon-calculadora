(function exposeCalculations(root, factory) {
  const calculations = factory();

  if (typeof module === 'object' && module.exports) {
    module.exports = calculations;
  }

  root.StructuralCalculations = calculations;
}(typeof globalThis !== 'undefined' ? globalThis : this, function createCalculations() {
  'use strict';

  const CONCRETE_DENSITY = 2400;

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  function calculateWallAreas({ width, wallH, ridgeH, depth, openings }) {
    const perimeter = 2 * (width + depth);
    const rectangularArea = perimeter * wallH;
    const gableArea = width * Math.max(0, ridgeH - wallH);
    const grossArea = rectangularArea + gableArea;
    const netArea = Math.max(0, grossArea - openings);

    return { perimeter, rectangularArea, gableArea, grossArea, netArea };
  }

  function calculateFootingUplift({ width, length, baseDepth, thickness, soilDensity, tension }) {
    const footingThickness = Math.min(Math.max(0, thickness), Math.max(0, baseDepth));
    const soilCover = Math.max(0, baseDepth - footingThickness);
    const footingWeight = width * length * footingThickness * CONCRETE_DENSITY;
    const tan30 = Math.tan(30 * Math.PI / 180);
    const topWidth = width + 2 * soilCover * tan30;
    const topLength = length + 2 * soilCover * tan30;
    const bottomArea = width * length;
    const topArea = topWidth * topLength;
    const soilVolume = soilCover / 3
      * (bottomArea + topArea + Math.sqrt(bottomArea * topArea));
    const soilWeight = soilVolume * soilDensity;
    const resistingWeight = footingWeight + soilWeight;
    const safetyFactor = tension > 0 ? resistingWeight / tension : Infinity;

    return {
      footingThickness,
      soilCover,
      footingWeight,
      soilVolume,
      soilWeight,
      resistingWeight,
      FS: safetyFactor,
    };
  }

  function calculateRoofPanelCount({ depth, slopeLength, panelWidth, panelHeight }) {
    if (depth <= 0 || slopeLength <= 0 || panelWidth <= 0 || panelHeight <= 0) {
      return 0;
    }

    const panelsPerSlope = Math.min(
      Math.ceil(depth / panelWidth) * Math.ceil(slopeLength / panelHeight),
      Math.ceil(depth / panelHeight) * Math.ceil(slopeLength / panelWidth),
    );

    return panelsPerSlope * 2;
  }

  return {
    CONCRETE_DENSITY,
    clamp,
    calculateWallAreas,
    calculateFootingUplift,
    calculateRoofPanelCount,
  };
}));
