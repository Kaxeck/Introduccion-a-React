import { useParams, Link } from "react-router-dom";

// Componente para ver el detalle de una cita específica según su id
function CitaDetalle() {
    const { id } = useParams();
    return (
        <div className="card">
            <h1 className="page-title">Detalle de la Cita #{id}</h1>
            <p className="page-description">Información completa acerca de la consulta agendada.</p>
            <div style={{ marginTop: '1.5rem' }}>
                <Link 
                    to="/citas" 
                    style={{ 
                        textDecoration: 'none', 
                        color: 'var(--primary)', 
                        fontWeight: '500' 
                    }}
                >
                    ← Volver a Citas
                </Link>
            </div>
        </div>
    );
}

export default CitaDetalle;