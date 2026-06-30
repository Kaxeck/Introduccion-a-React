import "./App.css";
import Tarjeta from "./Tarjeta";
import Lista from "./Lista";

function App() {
  return (
    <div>
      <div>
        <h1>Tarjeta de Presentación</h1>
        {/* Renderizamos el componente Tarjeta */}
        <Tarjeta />
      </div>
      <div>
        <Lista />
      </div>
    </div>
  );
}

export default App;
