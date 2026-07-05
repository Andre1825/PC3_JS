import apiClient from './apiClient';

/**
 * Servicio de dominio: encapsula la llamada al endpoint de predicción.
 * Los componentes no conocen la URL ni Axios; solo llaman a esta función.
 *
 * @param {Object} formData - payload con las 7 variables del modelo
 * @returns {Promise<Object>} respuesta { caso, prediccion, confianza, ranking, recomendaciones, entrada }
 */
export async function predecirDemanda(formData) {
  const payload = {
    precio: Number(formData.precio),
    stock_actual: Number(formData.stock_actual),
    ventas_7d: Number(formData.ventas_7d),
    descuento_pct: Number(formData.descuento_pct),
    temporada: Number(formData.temporada),
    dias_sin_reabastecer: Number(formData.dias_sin_reabastecer),
    rating_producto: Number(formData.rating_producto),
  };

  const { data } = await apiClient.post('/prediccion/smart-stock', payload);
  return data;
}
