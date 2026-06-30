function lista() {

    const titulo = 'Lista de tareas';
    const pendientes = [
        {
            id: 1,
            tarea: 'Aprender React',
            completada: false
        },
        {
            id: 2,
            tarea: 'Aprender JavaScript',
            completada: true
        },
        {
            id: 3,
            tarea: 'Aprender CSS',
            completada: false
        }
    ];

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', width: '300px', textAlign: 'center' }}>
            <h2>{titulo}</h2>
            <ul>
                {pendientes.map((pendiente) => (
                    <li key={pendiente.id}>
                        {pendiente.tarea} - {pendiente.completada ? 'Completada' : 'Pendiente'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default lista;