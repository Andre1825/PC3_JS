/** Lista de recomendaciones de negocio devueltas por el modelo Python. */
export default function RecommendationList({ recomendaciones = [] }) {
  if (!recomendaciones.length) return null;

  return (
    <div className="recos">
      <h3 className="recos__title">💡 Recomendaciones de negocio</h3>
      <ul className="recos__list">
        {recomendaciones.map((texto, i) => (
          <li key={i} className="recos__item">
            <span className="recos__check">✔</span>
            {texto}
          </li>
        ))}
      </ul>
    </div>
  );
}
