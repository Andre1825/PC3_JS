import { RANGOS, TEMPORADAS } from '../utils/prediccion';

/**
 * Formulario validado con las 7 variables del modelo.
 * Muestra los rangos permitidos y los errores por campo (validación visual).
 */
export default function ProductForm({ form, errores, onChange, onSubmit, loading }) {
  const campos = Object.keys(RANGOS);

  return (
    <form className="card form" onSubmit={onSubmit} noValidate>
      <h2 className="form__title">Características del producto</h2>

      <div className="form__grid">
        {campos.map((campo) => {
          const regla = RANGOS[campo];
          return (
            <div className="form__field" key={campo}>
              <label htmlFor={campo}>{regla.label}</label>
              <input
                id={campo}
                name={campo}
                type="number"
                min={regla.min}
                max={regla.max}
                step={regla.step}
                value={form[campo]}
                onChange={onChange}
                className={errores[campo] ? 'input input--error' : 'input'}
              />
              <span className="form__hint">
                Rango: {regla.min} – {regla.max}
              </span>
              {errores[campo] && <span className="form__error">{errores[campo]}</span>}
            </div>
          );
        })}

        {/* Temporada es categórica -> select */}
        <div className="form__field">
          <label htmlFor="temporada">Temporada</label>
          <select
            id="temporada"
            name="temporada"
            value={form.temporada}
            onChange={onChange}
            className="input"
          >
            {TEMPORADAS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <span className="form__hint">Contexto comercial del periodo</span>
        </div>
      </div>

      <button type="submit" className="btn btn--primary" disabled={loading}>
        {loading ? 'Analizando…' : '⚡ Predecir demanda'}
      </button>
    </form>
  );
}
