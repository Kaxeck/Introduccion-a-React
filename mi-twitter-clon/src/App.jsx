import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import "./App.css";

/**
 * Componente principal App
 * Gestiona el estado global de autenticación, la persistencia en localStorage
 * y la protección de rutas navegables.
 */
const App = () => {
  // Estado para el usuario autenticado
  const [user, setUser] = useState(null);

  // Cargar el usuario guardado en localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función para iniciar sesión y guardar en localStorage
  const login = (username) => {
    const userData = { username };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Función para cerrar sesión y borrar de localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      {/* Menú de navegación */}
      <header className="navbar">
        <NavLink to="/" className="navbar-brand">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.35 5L2 22l5.1-1.33c1.43.82 3.09 1.33 4.9 1.33 5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.57 0-3.05-.44-4.32-1.2l-.31-.19-3.2.84.85-3.11-.2-.33A7.95 7.95 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
          </svg>
          <span>Red Social</span>
        </NavLink>
        <nav className="navbar-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Inicio
          </NavLink>
          {user ? (
            <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              Perfil
            </NavLink>
          ) : (
            <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              Ingresar
            </NavLink>
          )}
        </nav>
      </header>

      {/* Definición de rutas públicas y protegidas */}
      <main className="page-container">
        <Routes>
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/" element={<Home user={user} logout={logout} />} />
          {/* Ruta protegida: si no hay usuario, redirige a /login */}
          <Route
            path="/profile"
            element={user ? <Profile user={user} logout={logout} /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;