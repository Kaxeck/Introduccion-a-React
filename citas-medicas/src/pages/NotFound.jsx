// Componente para manejar rutas no encontradas (Error 404)
function NotFound() {
    return (
        <div className="card">
            <h1 className="page-title">404 - No encontrado</h1>
            <p className="page-description">Lo sentimos, la página que buscas no existe.</p>
        </div>
    );
}

export default NotFound;