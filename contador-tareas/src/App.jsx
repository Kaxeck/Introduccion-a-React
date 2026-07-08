import { useState, useEffect, useMemo } from 'react';
import './App.css';

function App() {
  // Cargar tareas desde localStorage al iniciar
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [filtroDuracion, setFiltroDuracion] = useState('todas');

  // Cálculo de tiempo total optimizado con useMemo
  const calcularTiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]);

  // Persistencia: guardar tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  // Efecto secundario: Actualizar el título del documento cada vez que cambia el total
  useEffect(() => {
    document.title = `Total: ${calcularTiempoTotal} minutos`;
  }, [tareas, calcularTiempoTotal]);

  // Filtrado de tareas según la duración seleccionada
  const tareasFiltradas = useMemo(() => {
    switch (filtroDuracion) {
      case 'corta':
        return tareas.filter(tarea => tarea.duracion <= 30);
      case 'mediana':
        return tareas.filter(tarea => tarea.duracion > 30 && tarea.duracion <= 60);
      case 'larga':
        return tareas.filter(tarea => tarea.duracion > 60);
      default:
        return tareas;
    }
  }, [tareas, filtroDuracion]);

  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion),
        fecha: new Date().toLocaleDateString()
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  // Función para eliminar una tarea
  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Contador de Tareas</h1>
        <p className="subtitle">Organiza y registra el tiempo de tus actividades</p>
      </header>

      <div className="form-container">
        <div className="input-group">
          <input 
            type="text" 
            value={nuevaTarea} 
            onChange={(e) => setNuevaTarea(e.target.value)} 
            placeholder="Nombre de la tarea" 
            className="input-text"
          />
          <input 
            type="number" 
            value={duracion} 
            onChange={(e) => setDuracion(e.target.value)} 
            placeholder="Duración (min)" 
            className="input-number"
            min="1"
          />
          <button onClick={agregarTarea} className="btn-agregar">+ Agregar</button>
        </div>
      </div>

      <div className="filtros">
        <span className="filtro-label">Filtrar por duración:</span>
        <div className="filtro-botones">
          <button 
            className={`btn-filtro ${filtroDuracion === 'todas' ? 'activo' : ''}`}
            onClick={() => setFiltroDuracion('todas')}
          >
            Todas
          </button>
          <button 
            className={`btn-filtro ${filtroDuracion === 'corta' ? 'activo' : ''}`}
            onClick={() => setFiltroDuracion('corta')}
          >
            ≤ 30 min
          </button>
          <button 
            className={`btn-filtro ${filtroDuracion === 'mediana' ? 'activo' : ''}`}
            onClick={() => setFiltroDuracion('mediana')}
          >
            31 - 60 min
          </button>
          <button 
            className={`btn-filtro ${filtroDuracion === 'larga' ? 'activo' : ''}`}
            onClick={() => setFiltroDuracion('larga')}
          >
            {'>'} 60 min
          </button>
        </div>
      </div>

      <div className="tareas-container">
        <h2>Tareas ({tareasFiltradas.length})</h2>
        {tareasFiltradas.length === 0 ? (
          <p className="sin-tareas">No hay tareas para mostrar con este filtro.</p>
        ) : (
          <ul className="lista-tareas">
            {tareasFiltradas.map((tarea, index) => (
              <li key={index} className={`tarea-card ${tarea.duracion <= 30 ? 'corta' : tarea.duracion <= 60 ? 'mediana' : 'larga'}`}>
                <div className="tarea-info">
                  <span className="tarea-nombre">{tarea.nombre}</span>
                  <span className="tarea-fecha">Agregada: {tarea.fecha}</span>
                </div>
                <div className="tarea-acciones">
                  <span className="tarea-duracion">{tarea.duracion} min</span>
                  <button onClick={() => eliminarTarea(index)} className="btn-eliminar" title="Eliminar tarea">✕</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="app-footer">
        <h3>⏱️ Total acumulado: {calcularTiempoTotal} minutos</h3>
      </footer>
    </div>
  );
}

export default App;
