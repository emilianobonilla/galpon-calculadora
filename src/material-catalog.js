(function exposeMaterialCatalog(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.MaterialCatalog = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function createMaterialCatalog() {
  'use strict';

  const STORAGE_KEY = 'galponCalculadoraMaterialCatalogV1';
  const TYPES = Object.freeze({
    C: 'Perfil C',
    Q: 'Caño cuadrado',
    R: 'Caño rectangular',
    FLOOR: 'Caño para piso de altillo',
  });

  const DEFAULT_ITEMS = [
    {id:'c80x40x16', type:'C', label:'80×40 mm — esp. 1.6 mm', pesoKgM:2.36, sepMax:1.2, pricePerMeter:0},
    {id:'c80x40x20', type:'C', label:'80×40 mm — esp. 2.0 mm', pesoKgM:2.95, sepMax:1.4, pricePerMeter:0},
    {id:'c100x50x16', type:'C', label:'100×50 mm — esp. 1.6 mm', pesoKgM:2.98, sepMax:1.6, pricePerMeter:0},
    {id:'c100x50x20', type:'C', label:'100×50 mm — esp. 2.0 mm', pesoKgM:3.71, sepMax:1.8, pricePerMeter:0},
    {id:'c150x50x20', type:'C', label:'150×50 mm — esp. 2.0 mm', pesoKgM:4.60, sepMax:2.2, pricePerMeter:0},
    {id:'q30x30', type:'Q', label:'30×30 mm — esp. 1.6 mm', pesoKgM:1.35, sepMax:1.0, pricePerMeter:0},
    {id:'q40x40_16', type:'Q', label:'40×40 mm — esp. 1.6 mm', pesoKgM:1.85, sepMax:1.3, pricePerMeter:0},
    {id:'q40x40_20', type:'Q', label:'40×40 mm — esp. 2.0 mm', pesoKgM:2.30, sepMax:1.4, pricePerMeter:0},
    {id:'q50x50_16', type:'Q', label:'50×50 mm — esp. 1.6 mm', pesoKgM:2.35, sepMax:1.6, pricePerMeter:0},
    {id:'q50x50_20', type:'Q', label:'50×50 mm — esp. 2.0 mm', pesoKgM:2.95, sepMax:1.8, pricePerMeter:0},
    {id:'q60x60_16', type:'Q', label:'60×60 mm — esp. 1.6 mm', pesoKgM:2.85, sepMax:2.0, pricePerMeter:0},
    {id:'q60x60_20', type:'Q', label:'60×60 mm — esp. 2.0 mm', pesoKgM:3.60, sepMax:2.2, pricePerMeter:0},
    {id:'q70x70_20', type:'Q', label:'70×70 mm — esp. 2.0 mm', pesoKgM:4.20, sepMax:2.5, pricePerMeter:0},
    {id:'q80x80_20', type:'Q', label:'80×80 mm — esp. 2.0 mm', pesoKgM:4.85, sepMax:2.8, pricePerMeter:0},
    {id:'q100x100_20', type:'Q', label:'100×100 mm — esp. 2.0 mm', pesoKgM:6.10, sepMax:3.2, pricePerMeter:0},
    {id:'r60x40_20', type:'R', label:'60×40 mm — esp. 2.0 mm', pesoKgM:2.95, sepMax:1.5, pricePerMeter:0},
    {id:'r80x40_20', type:'R', label:'80×40 mm — esp. 2.0 mm', pesoKgM:3.55, sepMax:1.8, pricePerMeter:0},
    {id:'r100x50_20', type:'R', label:'100×50 mm — esp. 2.0 mm', pesoKgM:4.55, sepMax:2.2, pricePerMeter:0},
    {id:'r100x60_25', type:'R', label:'100×60 mm — esp. 2.5 mm', pesoKgM:5.90, sepMax:2.6, pricePerMeter:0},
    {id:'p30x30', type:'FLOOR', label:'30×30 mm — esp. 1.6 mm', pesoKgM:1.35, spanRef05:0.55, pricePerMeter:0},
    {id:'p40x40_16', type:'FLOOR', label:'40×40 mm — esp. 1.6 mm', pesoKgM:1.85, spanRef05:0.75, pricePerMeter:0},
    {id:'p40x40_20', type:'FLOOR', label:'40×40 mm — esp. 2.0 mm', pesoKgM:2.30, spanRef05:0.85, pricePerMeter:0},
    {id:'p50x50_16', type:'FLOOR', label:'50×50 mm — esp. 1.6 mm', pesoKgM:2.35, spanRef05:0.95, pricePerMeter:0},
    {id:'p50x50_20', type:'FLOOR', label:'50×50 mm — esp. 2.0 mm', pesoKgM:2.95, spanRef05:1.05, pricePerMeter:0},
    {id:'p60x60_16', type:'FLOOR', label:'60×60 mm — esp. 1.6 mm', pesoKgM:2.85, spanRef05:1.15, pricePerMeter:0},
    {id:'p60x60_20', type:'FLOOR', label:'60×60 mm — esp. 2.0 mm', pesoKgM:3.60, spanRef05:1.25, pricePerMeter:0},
    {id:'p70x70_20', type:'FLOOR', label:'70×70 mm — esp. 2.0 mm', pesoKgM:4.20, spanRef05:1.45, pricePerMeter:0},
    {id:'p80x80_20', type:'FLOOR', label:'80×80 mm — esp. 2.0 mm', pesoKgM:4.85, spanRef05:1.65, pricePerMeter:0},
    {id:'p100x100_16', type:'FLOOR', label:'100×100 mm — esp. 1.6 mm', pesoKgM:4.94, spanRef05:1.85, pricePerMeter:0},
    {id:'p100x100_20', type:'FLOOR', label:'100×100 mm — esp. 2.0 mm', pesoKgM:6.10, spanRef05:2.05, pricePerMeter:0},
  ];

  const clone = value => JSON.parse(JSON.stringify(value));
  const defaults = () => clone(DEFAULT_ITEMS);

  function normalize(item) {
    return {
      id: String(item.id || '').trim(),
      type: TYPES[item.type] ? item.type : 'Q',
      label: String(item.label || '').trim(),
      pesoKgM: Math.max(0, Number(item.pesoKgM) || 0),
      ...(item.type === 'FLOOR'
        ? { spanRef05: Math.max(0, Number(item.spanRef05) || 0) }
        : { sepMax: Math.max(0, Number(item.sepMax) || 0) }),
      pricePerMeter: Math.max(0, Number(item.pricePerMeter) || 0),
    };
  }

  function load() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(parsed) && parsed.length) return parsed.map(normalize);
    } catch (error) {
      console.warn('No se pudo leer el catálogo guardado.', error);
    }
    return defaults();
  }

  function save(items) {
    const normalized = items.map(normalize);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    return defaults();
  }

  function group(items, type) {
    return items.filter(item => item.type === type);
  }

  return { STORAGE_KEY, TYPES, defaults, load, save, reset, group, normalize };
}));
