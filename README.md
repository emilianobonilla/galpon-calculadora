# Calculadora — Galpón nórdico (Villa Serrana, Lavalleja)

Herramienta de pre-dimensionado estructural, cómputo de materiales, costos
y planos técnicos esquemáticos para una vivienda estilo galpón nórdico,
estructura metálica (pórticos), autoconstruida, en el padrón 15070,
Villa Serrana, Lavalleja, Uruguay.

## Qué hace

- Pre-dimensiona pórticos, columnas, correas y vigas por rango de carga y luz.
- Calcula succión de viento (UNIT 50-84, Vk = 135 km/h), corte y anclaje de
  columnas (bulones, placa base, zapata a arrancamiento).
- Calcula arriostramiento longitudinal (cruces de San Andrés).
- Verifica geometría y habitabilidad del altillo (Art. 54, Ordenanza de
  Lavalleja), con opción de "sin altillo habitable" (solo guardado).
- Cómputo de materiales (chapa, correas, vigas, columnas, fenólico, lana de
  roca, hormigón) y costo total estimado, con precios editables.
- Dibuja vista frontal, lateral, isométrica y detalles constructivos
  (anclaje de columna, nudo de cumbrera) en SVG a escala real, con barra
  de escala gráfica.

## Cómo usarla

Sin instalación ni build. Es un único archivo HTML autocontenido
(vanilla JS + SVG inline):

```
Abrí index.html en cualquier navegador.
```

## Alcance y límites — IMPORTANTE

Da **números de referencia para pre-dimensionar y llevarle al ingeniero
estructural**, no reemplaza cálculo ni firma de técnico registrado. En
particular:

- Los coeficientes de forma de viento (Cpe) son un modelo orientativo, no
  una transcripción literal de las tablas de UNIT 50-84 (cap. 8-12).
- No verifica pandeo de columnas, flexión/flecha de vigas, ni diafragma de
  cubierta (arriostramiento del plano de techo).
- Los precios de materiales son estimaciones editables, no cotizaciones
  vigentes (pendiente cotización real de Barraca Carmela, Appelsa, Brinolsa).

## Desarrollo

- Cada cambio funcional = un commit, con mensaje descriptivo (ver
  convención abajo).
- Tests de lógica numérica en `tests/`, corridos con Node.js (sin
  dependencias externas; usan `node --check` y jsdom para el DOM cuando
  aplica).
- `CHANGELOG.md` lleva el registro de versiones — actualizarlo en cada
  release, no en cada commit.

### Convención de mensajes de commit

```
tipo: descripción corta en infinitivo

fix: corregir zapata por arrancamiento de viento
feat: agregar módulo de escalera al altillo
docs: actualizar README con alcance de Cpe
refactor: extraer cálculo de anclaje a función propia
```

## Estado

Ver `CHANGELOG.md` para la versión actual y el historial de cambios.
