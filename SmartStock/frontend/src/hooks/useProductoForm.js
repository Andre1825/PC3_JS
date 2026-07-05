import { useState } from 'react';
import { RANGOS } from '../utils/prediccion';

const ESTADO_INICIAL = {
  precio: 129.9,
  stock_actual: 80,
  ventas_7d: 420,
  descuento_pct: 20,
  temporada: 2,
  dias_sin_reabastecer: 18,
  rating_producto: 4.6,
};

/**
 * Hook de formulario: mantiene los valores, valida los rangos en el cliente
 * (misma frontera que Spring Boot) y expone errores por campo.
 */
export function useProductoForm(valoresIniciales = ESTADO_INICIAL) {
  const [form, setForm] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function cargarProducto(producto) {
    setForm({
      precio: producto.precio,
      stock_actual: producto.stock_actual,
      ventas_7d: producto.ventas_7d,
      descuento_pct: producto.descuento_pct,
      temporada: producto.temporada,
      dias_sin_reabastecer: producto.dias_sin_reabastecer,
      rating_producto: producto.rating_producto,
    });
    setErrores({});
  }

  /** Devuelve true si todos los campos respetan su rango. */
  function validar() {
    const nuevosErrores = {};
    Object.entries(RANGOS).forEach(([campo, regla]) => {
      const valor = Number(form[campo]);
      if (form[campo] === '' || Number.isNaN(valor)) {
        nuevosErrores[campo] = 'Campo obligatorio';
      } else if (valor < regla.min || valor > regla.max) {
        nuevosErrores[campo] = `Debe estar entre ${regla.min} y ${regla.max}`;
      }
    });
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  return { form, errores, handleChange, cargarProducto, validar, setForm };
}
