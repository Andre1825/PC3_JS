import { getPredictionMeta } from '../utils/prediccion';

/**
 * Semáforo visual de reposición: enciende la luz correspondiente a la
 * decisión (rojo = reabastecer, ámbar = monitorear, verde = optimizar).
 */
export default function AlertBadge({ prediccion }) {
  const meta = getPredictionMeta(prediccion);
  const luces = ['rojo', 'ambar', 'verde'];

  return (
    <div className="alerta">
      <div className="semaforo" role="img" aria-label={`Semáforo ${meta.semaforo}`}>
        {luces.map((luz) => (
          <span
            key={luz}
            className={`semaforo__luz semaforo__luz--${luz} ${
              meta.semaforo === luz ? 'is-on' : ''
            }`}
          />
        ))}
      </div>
      <div>
        <span className="badge" style={{ backgroundColor: meta.color }}>
          {meta.icono} {meta.decision}
        </span>
        <p className="alerta__msg">{meta.mensaje}</p>
      </div>
    </div>
  );
}
