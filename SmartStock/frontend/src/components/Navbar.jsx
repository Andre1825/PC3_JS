import { NavLink } from 'react-router-dom';

/** Barra de navegación superior (evidencia de navegación con react-router). */
export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">📦</span>
        <div>
          <h1>SmartStock360</h1>
          <small>Predicción de demanda e inventario · IA</small>
        </div>
      </div>
      <nav className="navbar__links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Dashboard
        </NavLink>
        <NavLink to="/catalogo" className={({ isActive }) => (isActive ? 'active' : '')}>
          Catálogo
        </NavLink>
      </nav>
    </header>
  );
}
