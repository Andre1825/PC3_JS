import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Catalogo from './pages/Catalogo';

/** Enrutado principal de la aplicación (Dashboard + Catálogo). */
export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/catalogo" element={<Catalogo />} />
        </Routes>
      </main>
      <footer className="app__footer">
        UTP · JavaScript Avanzado · Semana 15 · PC3 — CASO 4 SmartStock360
        &nbsp;·&nbsp; React → Spring Boot → Python (RandomForest)
      </footer>
    </div>
  );
}
