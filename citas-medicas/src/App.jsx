import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Citas from './pages/Citas';
import CitaDetalle from './pages/CitaDetalle';
import NotFound from './pages/NotFound';
import './App.css';

// Componente principal de la aplicación que gestiona la navegación e itinerario de rutas
function App() {
  return (
    <BrowserRouter>
      {/* Barra de navegación principal */}
      <header className="navbar">
        <Link to="/" className="navbar-brand">
          🏥 Citas Médicas
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
          <Link to="/citas" className="nav-link">
            Ver Citas
          </Link>
        </nav>
      </header>

      {/* Contenedor dinámico de las páginas */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/cita/:id" element={<CitaDetalle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;