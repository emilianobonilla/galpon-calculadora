(function initializeMaterialAdmin() {
  'use strict';

  const byId = id => document.getElementById(id);
  const form = byId('materialForm');
  const filter = byId('filterType');
  const type = byId('type');
  let items = MaterialCatalog.load();
  const escapeHtml = value => String(value).replace(/[&<>"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
  })[character]);

  Object.entries(MaterialCatalog.TYPES).forEach(([value, label]) => {
    filter.add(new Option(label, value));
  });

  function setFieldMode() {
    const isFloor = type.value === 'FLOOR';
    byId('spacingField').hidden = isFloor;
    byId('spanField').hidden = !isFloor;
    byId('spacing').required = !isFloor;
    byId('span').required = isFloor;
  }

  function clearForm() {
    form.reset();
    byId('originalId').value = '';
    byId('formTitle').textContent = 'Nuevo material';
    byId('formError').hidden = true;
    setFieldMode();
  }

  function editItem(id) {
    const item = items.find(candidate => candidate.id === id);
    if (!item) return;
    byId('originalId').value = item.id;
    byId('materialId').value = item.id;
    type.value = item.type;
    byId('label').value = item.label;
    byId('weight').value = item.pesoKgM;
    byId('price').value = item.pricePerMeter;
    byId('spacing').value = item.sepMax || '';
    byId('span').value = item.spanRef05 || '';
    byId('formTitle').textContent = 'Editar material';
    setFieldMode();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function removeItem(id) {
    const item = items.find(candidate => candidate.id === id);
    if (!item) return;
    if (items.filter(candidate => candidate.type === item.type).length === 1) {
      alert('Debe quedar al menos una opción de cada familia para que la calculadora funcione.');
      return;
    }
    if (!confirm(`¿Eliminar “${item.label}”?`)) return;
    items = MaterialCatalog.save(items.filter(candidate => candidate.id !== id));
    render();
    clearForm();
  }

  function render() {
    const visibleItems = filter.value === 'ALL'
      ? items
      : items.filter(item => item.type === filter.value);
    byId('catalogList').innerHTML = visibleItems.length
      ? visibleItems.map(item => `
        <article class="material-row">
          <div><strong>${escapeHtml(item.label)}</strong><small>${escapeHtml(MaterialCatalog.TYPES[item.type])} · ${escapeHtml(item.id)}</small></div>
          <span class="metric">${item.pesoKgM.toFixed(2)} kg/m</span>
          <span class="price">${item.pricePerMeter ? '$ ' + item.pricePerMeter.toLocaleString('es-UY') + '/m' : 'Sin precio'}</span>
          <div class="row-actions">
            <button type="button" data-edit="${item.id}" aria-label="Editar ${escapeHtml(item.label)}">Editar</button>
            <button type="button" data-delete="${item.id}" aria-label="Eliminar ${escapeHtml(item.label)}">Eliminar</button>
          </div>
        </article>`).join('')
      : '<p class="empty">No hay materiales en esta familia.</p>';
    byId('totalItems').textContent = items.length;
    byId('pricedItems').textContent = items.filter(item => item.pricePerMeter > 0).length;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const originalId = byId('originalId').value;
    const candidate = MaterialCatalog.normalize({
      id: byId('materialId').value,
      type: type.value,
      label: byId('label').value,
      pesoKgM: byId('weight').value,
      pricePerMeter: byId('price').value,
      sepMax: byId('spacing').value,
      spanRef05: byId('span').value,
    });
    const duplicate = items.some(item => item.id === candidate.id && item.id !== originalId);
    if (duplicate) {
      byId('formError').textContent = 'El identificador ya está en uso. Elegí uno diferente.';
      byId('formError').hidden = false;
      return;
    }
    items = originalId
      ? items.map(item => item.id === originalId ? candidate : item)
      : [...items, candidate];
    items = MaterialCatalog.save(items);
    byId('lastSaved').textContent = 'Guardado';
    render();
    clearForm();
  });

  byId('catalogList').addEventListener('click', event => {
    const editId = event.target.dataset.edit;
    const deleteId = event.target.dataset.delete;
    if (editId) editItem(editId);
    if (deleteId) removeItem(deleteId);
  });
  type.addEventListener('change', setFieldMode);
  filter.addEventListener('change', render);
  byId('newButton').addEventListener('click', clearForm);
  byId('resetButton').addEventListener('click', () => {
    if (!confirm('¿Restaurar todos los materiales y precios iniciales?')) return;
    items = MaterialCatalog.reset();
    byId('lastSaved').textContent = 'Restaurado';
    render();
    clearForm();
  });

  setFieldMode();
  render();
}());
