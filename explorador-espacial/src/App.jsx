import React, { useState, useEffect, useMemo, useRef } from 'react';
import Planeta from './Planeta';
import './App.css';

function App() {
  // Estado
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [planetasVisitados, setPlanetasVisitados] = useState([]);

  // Estado de planetas registrados y formulario
  const [planetas, setPlanetas] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('planetas')) || [];
    } catch (err) {
      console.error("Error leyendo localStorage:", err);
      return [];
    }
  });
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedPlanetaIndex, setSelectedPlanetaIndex] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const inputImagenRef = useRef(null);

  // Efectos Secundarios (useEffect)
  useEffect(() => {
    console.log("¡El panel de control está listo!"); // Montaje

    const intervalo = setInterval(() => { // Montaje
      setCombustible((prev) => Math.max(0, prev - 1));
      setDistancia((prev) => prev + 10);
    }, 1000);

    return () => {
      clearInterval(intervalo); // Desmontaje
      console.log("El panel de control se ha apagado."); // Desmontaje
    };
  }, []);

  useEffect(() => {
    console.log("¡Combustible actualizado!"); // Actualización
  }, [combustible]);

  // Almacenamiento en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('planetas', JSON.stringify(planetas));
    } catch (err) {
      console.error("Error guardando en localStorage:", err);
      setErrorMsg("Error al guardar en el almacenamiento local.");
    }
  }, [planetas]);

  // Cálculo con useMemo
  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`;
  }, [estadoNave]);

  // Manejo de aterrizaje
  const handleAterrizar = () => {
    setEstadoNave("Aterrizando");
    const nuevoNombre = `Planeta ${planetasVisitados.length + 1}`;
    setPlanetasVisitados([...planetasVisitados, nuevoNombre]);
  };

  // Validación de archivo de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorMsg('Por favor selecciona un archivo de imagen válido.');
        setImagen(null);
        if (inputImagenRef.current) inputImagenRef.current.value = '';
        return;
      }
      if (file.size > 3 * 1024 * 1024) { // Límite de 3MB
        setErrorMsg('La imagen debe pesar menos de 3MB.');
        setImagen(null);
        if (inputImagenRef.current) inputImagenRef.current.value = '';
        return;
      }
      setErrorMsg('');
      setImagen(file);
    }
  };

  // Envío del formulario con validación y manejo de errores
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validación del Formulario
    if (!nombre.trim() || !descripcion.trim()) {
      setErrorMsg('El nombre y la descripción son obligatorios.');
      return;
    }

    const guardar = (imagenVal) => {
      const planetaData = {
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        imagen: imagenVal,
      };

      if (editIndex !== null) {
        const nuevosPlanetas = [...planetas];
        nuevosPlanetas[editIndex] = planetaData;
        setPlanetas(nuevosPlanetas);
        setEditIndex(null);
      } else {
        setPlanetas([...planetas, planetaData]);
      }

      setNombre('');
      setDescripcion('');
      setImagen(null);
      if (inputImagenRef.current) {
        inputImagenRef.current.value = ''; // Limpiar el input de imagen
      }
    };

    if (imagen && typeof imagen !== 'string') {
      const reader = new FileReader();
      reader.onloadend = () => {
        guardar(reader.result);
      };
      reader.onerror = () => {
        setErrorMsg('Error al leer el archivo de imagen.');
      };
      reader.readAsDataURL(imagen);
    } else {
      guardar(typeof imagen === 'string' ? imagen : null);
    }
  };

  // Editar planeta
  const handleEdit = (index, e) => {
    e.stopPropagation();
    const p = planetas[index];
    setNombre(p.nombre);
    setDescripcion(p.descripcion);
    setImagen(p.imagen);
    setEditIndex(index);
    setErrorMsg('');
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setEditIndex(null);
    setNombre('');
    setDescripcion('');
    setImagen(null);
    if (inputImagenRef.current) inputImagenRef.current.value = '';
    setErrorMsg('');
  };

  // Eliminar planeta
  const handleDelete = (index, e) => {
    e.stopPropagation();
    const nuevosPlanetas = [...planetas];
    nuevosPlanetas.splice(index, 1);
    setPlanetas(nuevosPlanetas);
    if (selectedPlanetaIndex === index) {
      setSelectedPlanetaIndex(null);
    }
  };

  // Mostrar detalle al hacer clic
  const handleToggleSelect = (index) => {
    setSelectedPlanetaIndex(selectedPlanetaIndex === index ? null : index);
  };

  return (
    <div className="container">
      <h1>Explorador Espacial</h1>

      {/* Panel de Control */}
      <section className="panel-section">
        <h2>Panel de Control</h2>
        <div className="panel-info">
          <p>Distancia: {distancia}</p>
          <p>Combustible: {combustible}</p>
          <p>{mensajeEstado}</p>
        </div>
        <button className="btn" onClick={handleAterrizar} style={{ marginTop: '10px' }}>
          Aterrizar
        </button>

        <h3 style={{ marginTop: '20px' }}>Planetas Visitados</h3>
        <div className="planetas-grid">
          {planetasVisitados.map((planeta, index) => (
            <Planeta key={index} nombre={planeta} />
          ))}
        </div>
      </section>

      {/* Bitácora de Exploración */}
      <section className="bitacora-section">
        <h1>Bitácora de Exploración</h1>

        {errorMsg && <div className="error-banner">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="form-group">
          <input
            type="text"
            placeholder="Nombre del planeta"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={inputImagenRef}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn">
              {editIndex !== null ? 'Actualizar Planeta' : 'Guardar'}
            </button>
            {editIndex !== null && (
              <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <h2>Planetas Registrados</h2>
        {planetas.length === 0 ? (
          <p>No hay planetas registrados en la bitácora.</p>
        ) : (
          <ul className="planeta-list">
            {planetas.map((planeta, index) => (
              <li
                key={index}
                className="planeta-item"
                onClick={() => handleToggleSelect(index)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0 }}>{planeta.nombre}</h3>
                  <div>
                    <button
                      className="btn"
                      style={{ marginRight: '8px', padding: '4px 8px', fontSize: '12px' }}
                      onClick={(e) => handleEdit(index, e)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ padding: '4px 8px', fontSize: '12px' }}
                      onClick={(e) => handleDelete(index, e)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                {selectedPlanetaIndex === index && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed #ccc' }}>
                    <p>{planeta.descripcion}</p>
                    {planeta.imagen && (
                      <div>
                        <img src={planeta.imagen} alt={planeta.nombre} />
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
