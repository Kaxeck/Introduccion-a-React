import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Componente para el inicio de sesión
const Login = ({ onLogin }) => {
  // Estado para el nombre de usuario
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Enviar el formulario y redirigir al inicio
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username);
    navigate("/");
  };

  return (
    <div className="profile-card" style={{ padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h1 className="page-title" style={{ fontSize: "1.6rem", marginBottom: "8px" }}>
          Iniciar sesión
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: "360px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          {/* Campo de texto para el usuario */}
          <input
            type="text"
            className="tweet-input"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              fontSize: "1rem"
            }}
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Botón para enviar */}
        <button type="submit" className="btn-tweet" style={{ width: "100%", padding: "12px" }}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;


