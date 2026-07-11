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

Sin instalación ni build. Es una aplicación estática en vanilla JS + SVG:

```
Abrí index.html en cualquier navegador.
```

Los tipos de caños, sus propiedades y precios por metro se administran desde
`admin.html`. El catálogo se guarda localmente en el navegador y alimenta los
selectores y el cálculo de costos de `index.html`.

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
  dependencias externas). Ejecutar todos con `npm test`.
- La lógica numérica independiente del DOM vive en `src/calculations.js`;
  puede probarse sin cargar un navegador.
- `CHANGELOG.md` lleva el registro de versiones — actualizarlo en cada
  release, no en cada commit.

### Convención de mensajes de commit

Mensajes de commit en inglés, imperativo corto:

```
type: short imperative description

fix: correct footing uplift check
feat: add attic staircase module
docs: update README with Cpe scope
refactor: extract anchor calculation into its own function
```

## Estado

Ver `CHANGELOG.md` para la versión actual y el historial de cambios.
