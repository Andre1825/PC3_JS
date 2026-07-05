import { TEMPORADAS } from '../utils/prediccion';

/** Panel del producto con ícono y resumen de los valores actuales del formulario. */
export default function ProductPanel({ form, nombre = 'Producto en análisis', icono = '📦' }) {
  const temporada = TEMPORADAS.find((t) => Number(t.value) === Number(form.temporada));

  const chips = [
    { k: 'Precio', v: `S/ ${Number(form.precio).toFixed(2)}` },
    { k: 'Stock', v: `${form.stock_actual} u.` },
    { k: 'Ventas 7d', v: form.ventas_7d },
    { k: 'Descuento', v: `${form.descuento_pct}%` },
    { k: 'Temporada', v: temporada ? temporada.label : form.temporada },
    { k: 'Sin reabastecer', v: `${form.dias_sin_reabastecer} días` },
    { k: 'Rating', v: `⭐ ${form.rating_producto}` },
  ];

  return (
    <div className="card panel">
      <div className="panel__icono">{icono}</div>
      <div className="panel__info">
        <h2>{nombre}</h2>
        <div className="panel__chips">
          {chips.map((c) => (
            <span className="chip" key={c.k}>
              <strong>{c.k}:</strong> {c.v}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
