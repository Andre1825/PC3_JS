import { useState } from 'react';
import { predecirDemanda } from '../services/smartStockService';

/**
 * Hook personalizado que centraliza el ciclo de la predicción:
 * estado de carga, resultado y error. Los componentes solo consumen
 * { resultado, loading, error, predecir, reset }.
 */
export function useSmartStock() {
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function predecir(formData) {
    setLoading(true);
    setError(null);
    try {
      const data = await predecirDemanda(formData);
      setResultado(data);
      return data;
    } catch (err) {
      const mensaje =
        err.response?.data?.mensaje ||
        err.response?.data?.error ||
        (err.code === 'ERR_NETWORK'
          ? 'No se pudo conectar con Spring Boot (¿está corriendo en el puerto 8080?).'
          : 'Ocurrió un error al obtener la predicción.');
      setError(mensaje);
      setResultado(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResultado(null);
    setError(null);
  }

  return { resultado, loading, error, predecir, reset };
}
