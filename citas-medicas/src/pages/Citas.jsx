import { Link } from "react-router-dom";

// Componente que muestra el listado de citas disponibles
function Citas() {
    return (
        <div className="card">
            <h1 className="page-title">Listado de Citas</h1>
            <p className="page-description">Selecciona una cita para ver los detalles:</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Link 
                    to="/cita/1" 
                    style={{ 
                        padding: '0.75rem 1.25rem', 
                        background: '#f1f5f9', 
                        borderRadius: '8px', 
                        textDecoration: 'none', 
                        color: 'var(--primary)', 
                        fontWeight: '600',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    📋 Cita #1 - General
                </Link>
                <Link 
                    to="/cita/2" 
                    style={{ 
                        padding: '0.75rem 1.25rem', 
                        background: '#f1f5f9', 
                        borderRadius: '8px', 
                        textDecoration: 'none', 
                        color: 'var(--primary)', 
                        fontWeight: '600',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    📋 Cita #2 - Dental
                </Link>
            </div>
        </div>
    );
}

export default Citas;