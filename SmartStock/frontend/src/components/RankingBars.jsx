import { getPredictionMeta } from '../utils/prediccion';

/**
 * Gráfico de barras (CSS puro) con la probabilidad de cada clase.
 * Da soporte visual a la confianza mostrada en la tarjeta principal.
 */
export default function RankingBars({ ranking = [] }) {
  return (
    <div className="ranking">
      <h3 className="ranking__title">Distribución de probabilidad</h3>
      {ranking.map((item) => {
        const meta = getPredictionMeta(item.clase);
        const pct = Math.round(item.probabilidad * 100);
        return (
          <div className="ranking__row" key={item.clase}>
            <span className="ranking__label">{meta.titulo}</span>
            <div className="ranking__track">
              <div
                className="ranking__fill"
                style={{ width: `${pct}%`, backgroundColor: meta.color }}
              />
            </div>
            <span className="ranking__pct">{pct}%</span>
          </div>
        );
      })}
    </div>
  );
}
