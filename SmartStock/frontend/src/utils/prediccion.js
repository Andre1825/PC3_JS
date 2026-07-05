/**
 * Metadatos de presentación para cada clase de predicción del modelo.
 * Traduce la etiqueta técnica de Python a color, semáforo y decisión de negocio.
 */
export const PREDICTION_META = {
  DEMANDA_ALTA_REABASTECER: {
    titulo: 'Demanda Alta',
    decision: 'REABASTECER',
    semaforo: 'rojo',
    color: '#dc2626',
    icono: '🔴',
    mensaje: 'El producto se está agotando frente a su ritmo de ventas. Reponer en las próximas 48 horas.',
  },
  DEMANDA_MEDIA_MONITOREAR: {
    titulo: 'Demanda Media',
    decision: 'MONITOREAR',
    semaforo: 'ambar',
    color: '#d97706',
    icono: '🟡',
    mensaje: 'Rotación estable. Vigilar ventas diarias y preparar un pedido moderado si la temporada continúa.',
  },
  DEMANDA_BAJA_OPTIMIZAR: {
    titulo: 'Demanda Baja',
    decision: 'REDUCIR COMPRA',
    semaforo: 'verde',
    color: '#16a34a',
    icono: '🟢',
    mensaje: 'Riesgo de sobreinventario. Reducir compra, evaluar promoción o bundle y revisar precio.',
  },
};

export function getPredictionMeta(label) {
  return (
    PREDICTION_META[label] || {
      titulo: label || 'Sin predicción',
      decision: '—',
      semaforo: 'gris',
      color: '#64748b',
      icono: '⚪',
      mensaje: 'Resultado no reconocido.',
    }
  );
}

/** Rangos de validación (idénticos al DTO de Spring Boot y al modelo Python). */
export const RANGOS = {
  precio: { min: 1, max: 5000, step: 0.01, label: 'Precio (S/)' },
  stock_actual: { min: 0, max: 10000, step: 1, label: 'Stock actual (unid.)' },
  ventas_7d: { min: 0, max: 5000, step: 1, label: 'Ventas últimos 7 días' },
  descuento_pct: { min: 0, max: 90, step: 1, label: 'Descuento (%)' },
  dias_sin_reabastecer: { min: 0, max: 120, step: 1, label: 'Días sin reabastecer' },
  rating_producto: { min: 1, max: 5, step: 0.1, label: 'Rating del producto (1-5)' },
};

export const TEMPORADAS = [
  { value: 0, label: '0 · Normal' },
  { value: 1, label: '1 · Campaña' },
  { value: 2, label: '2 · Feriado / Alta demanda' },
];
