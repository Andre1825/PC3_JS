import { useNavigate } from 'react-router-dom';
import ProductTable from '../components/ProductTable';
import { PRODUCTOS_SIMULADOS } from '../data/productosSimulados';

/**
 * Página de catálogo: lista productos simulados. Al pulsar "Analizar" navega
 * al Dashboard llevando el producto por el state del router (flujo de navegación).
 */
export default function Catalogo() {
  const navigate = useNavigate();

  function seleccionar(producto) {
    navigate('/', { state: { producto } });
  }

  return (
    <div className="catalogo">
      <p className="catalogo__intro">
        Selecciona un producto para cargar sus variables en el dashboard y ejecutar la predicción del modelo.
      </p>
      <ProductTable productos={PRODUCTOS_SIMULADOS} onSeleccionar={seleccionar} />
    </div>
  );
}
