import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductPanel from '../components/ProductPanel';
import ProductForm from '../components/ProductForm';
import PredictionCard from '../components/PredictionCard';
import { useProductoForm } from '../hooks/useProductoForm';
import { useSmartStock } from '../hooks/useSmartStock';

/**
 * Pantalla principal: panel del producto + formulario validado + tarjeta de predicción.
 * Si se llega desde el catálogo, precarga el producto seleccionado (router state).
 */
export default function Dashboard() {
  const location = useLocation();
  const productoPreseleccionado = location.state?.producto ?? null;

  const { form, errores, handleChange, cargarProducto, validar } = useProductoForm();
  const { resultado, loading, error, predecir } = useSmartStock();
  const [meta, setMeta] = useState({ nombre: 'Producto en análisis', icono: '📦' });

  // Precarga cuando el usuario pulsó "Analizar" en el catálogo
  useEffect(() => {
    if (productoPreseleccionado) {
      cargarProducto(productoPreseleccionado);
      setMeta({ nombre: productoPreseleccionado.nombre, icono: productoPreseleccionado.icono });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productoPreseleccionado]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validar()) return;
    try {
      await predecir(form);
    } catch {
      /* el error ya queda expuesto por el hook */
    }
  }

  return (
    <div className="dashboard">
      <ProductPanel form={form} nombre={meta.nombre} icono={meta.icono} />

      <div className="dashboard__grid">
        <ProductForm
          form={form}
          errores={errores}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
        />

        <div className="dashboard__result">
          {error && <div className="alert alert--error">⚠️ {error}</div>}

          {!resultado && !error && (
            <div className="card placeholder">
              <span className="placeholder__icono">📊</span>
              <p>Completa las características y pulsa <strong>Predecir demanda</strong> para ver el resultado del modelo IA.</p>
            </div>
          )}

          {resultado && <PredictionCard resultado={resultado} />}
        </div>
      </div>
    </div>
  );
}
