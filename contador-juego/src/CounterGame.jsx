import { useReducer, useRef, useEffect, useCallback, useState } from "react";

const obtenerEstadoInicial = () => {
  const historialGuardado = localStorage.getItem("contador_historial");
  const historial = historialGuardado ? JSON.parse(historialGuardado) : [];
  
  // Opcional: Recalcular o recuperar el conteo basándonos en la última entrada del historial
  let conteo = 0;
  if (historial.length > 0) {
    const ultimaEntrada = historial[historial.length - 1];
    const coincidencia = ultimaEntrada.match(/\(Nuevo valor: (-?\d+)\)/);
    if (coincidencia) {
      conteo = parseInt(coincidencia[1], 10);
    }
  }

  return { count: conteo, history: historial };
};

function reductor(state, action) {
  switch (action.type) {
    case "increment": {
      const paso = action.payload ?? 1;
      const nuevoConteo = state.count + paso;
      return { 
        count: nuevoConteo, 
        history: [...state.history, `+${paso} (Nuevo valor: ${nuevoConteo})`] 
      };
    }
    case "decrement": {
      const nuevoConteo = state.count - 1;
      return { 
        count: nuevoConteo, 
        history: [...state.history, `-1 (Nuevo valor: ${nuevoConteo})`] 
      };
    }
    case "reset":
      return { count: 0, history: [] };
    case "undo": {
      if (state.history.length === 0) return state;
      const nuevoHistorial = state.history.slice(0, -1);
      const ultimaEntrada = state.history[state.history.length - 1];
      const coincidencia = ultimaEntrada.match(/^([+-]\d+)/);
      const valorCambio = coincidencia ? parseInt(coincidencia[1], 10) : 0;
      return {
        count: state.count - valorCambio,
        history: nuevoHistorial
      };
    }
    default:
      return state;
  }
}

export default function CounterGame() {
  const [estado, despachar] = useReducer(reductor, null, obtenerEstadoInicial);
  const [paso, establecerPaso] = useState(1);
  const refBotonIncremento = useRef(null);

  // Fijar el foco en el botón de incremento al renderizar
  useEffect(() => {
    if (refBotonIncremento.current) {
      refBotonIncremento.current.focus();
    }
  }, []);

  // Guardar el historial en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("contador_historial", JSON.stringify(estado.history));
  }, [estado.history]);

  const manejarIncremento = useCallback(() => {
    despachar({ type: "increment", payload: Number(paso) || 1 });
  }, [paso]);

  const manejarDecremento = useCallback(() => {
    despachar({ type: "decrement" });
  }, []);

  const manejarReiniciar = useCallback(() => {
    despachar({ type: "reset" });
  }, []);

  const manejarDeshacer = useCallback(() => {
    despachar({ type: "undo" });
  }, []);

  return (
    <div>
      <h2>Contador: {estado.count}</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="step-input" style={{ marginRight: "0.5rem" }}>
          Paso de incremento:
        </label>
        <input
          id="step-input"
          type="number"
          value={paso}
          onChange={(e) => establecerPaso(e.target.value === "" ? "" : Number(e.target.value))}
          style={{ width: "60px", padding: "0.2rem" }}
        />
      </div>

      <button ref={refBotonIncremento} onClick={manejarIncremento}>+</button>
      <button onClick={manejarDecremento}>-</button>
      <button onClick={manejarReiniciar}>Reset</button>
      <button onClick={manejarDeshacer} disabled={estado.history.length === 0}>Deshacer</button>

      <h3>Historial de cambios:</h3>
      <ul>
        {estado.history.map((entrada, indice) => (
          <li key={indice}>{entrada}</li>
        ))}
      </ul>
    </div>
  );
}