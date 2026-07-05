import { getPredictionMeta } from '../utils/prediccion';
import AlertBadge from './AlertBadge';
import RankingBars from './RankingBars';
import RecommendationList from './RecommendationList';

/**
 * Tarjeta principal del resultado: clase de predicción, confianza,
 * semáforo de reposición, gráfico de ranking y recomendaciones.
 */
export default function PredictionCard({ resultado }) {
  const meta = getPredictionMeta(resultado.prediccion);
  const confianzaPct = Math.round((resultado.confianza ?? 0) * 100);

  return (
    <section className="prediccion" style={{ borderTopColor: meta.color }}>
      <header className="prediccion__head" style={{ backgroundColor: meta.color }}>
        <span className="prediccion__icono">{meta.icono}</span>
        <div>
          <p className="prediccion__caso">{resultado.caso}</p>
          <h2 className="prediccion__label">{meta.titulo}</h2>
          <code className="prediccion__raw">{resultado.prediccion}</code>
        </div>
        <div className="prediccion__confianza">
          <span className="prediccion__confianza-num">{confianzaPct}%</span>
          <small>confianza</small>
        </div>
      </header>

      <div className="prediccion__body">
        <AlertBadge prediccion={resultado.prediccion} />
        <RankingBars ranking={resultado.ranking} />
        <RecommendationList recomendaciones={resultado.recomendaciones} />
      </div>
    </section>
  );
}
