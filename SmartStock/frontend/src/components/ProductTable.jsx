import { TEMPORADAS } from '../utils/prediccion';

/**
 * Tabla de productos simulados. Cada fila puede cargarse al formulario
 * con el botón "Analizar", lo que dispara una predicción real.
 */
export default function ProductTable({ productos, onSeleccionar }) {
  return (
    <div className="card tabla-wrap">
      <h2 className="form__title">Catálogo simulado</h2>
      <div className="tabla-scroll">
        <table className="tabla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Ventas 7d</th>
              <th>Desc.</th>
              <th>Temporada</th>
              <th>Sin reab.</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => {
              const temporada = TEMPORADAS.find((t) => t.value === p.temporada);
              const temporadaCorta = temporada
                ? temporada.label.split('·').pop().trim()
                : p.temporada;
              return (
                <tr key={p.id}>
                  <td className="tabla__prod">
                    <span className="tabla__icono">{p.icono}</span>
                    <div>
                      <strong>{p.nombre}</strong>
                      <small>{p.id}</small>
                    </div>
                  </td>
                  <td>S/ {p.precio.toFixed(2)}</td>
                  <td>{p.stock_actual}</td>
                  <td>{p.ventas_7d}</td>
                  <td>{p.descuento_pct}%</td>
                  <td>{temporadaCorta}</td>
                  <td>{p.dias_sin_reabastecer}d</td>
                  <td>⭐ {p.rating_producto}</td>
                  <td>
                    <button className="btn btn--ghost" onClick={() => onSeleccionar(p)}>
                      Analizar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
