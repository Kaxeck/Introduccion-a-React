// Componente para la página de perfil
const Profile = ({ user, logout }) => {
  // Obtener la inicial del usuario para el avatar
  const avatarInitial = user && user.username ? user.username.charAt(0).toUpperCase() : "U";

  return (
    <div className="profile-card">
      {/* Encabezado del perfil */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="page-title">Perfil</h1>
        {logout && (
          <button
            onClick={logout}
            className="btn-like"
            style={{ border: "1px solid var(--border)", padding: "6px 14px" }}
          >
            Cerrar sesión
          </button>
        )}
      </div>

      <div className="profile-banner" />

      {/* Información del usuario autenticado */}
      <div className="profile-info">
        <div className="profile-avatar">{avatarInitial}</div>
        <div className="profile-details">
          <h2 className="profile-name">Perfil</h2>
          {user && (
            <p style={{ marginTop: "8px", fontWeight: "600", color: "var(--text-primary)" }}>
              Nombre de usuario: {user.username}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;





