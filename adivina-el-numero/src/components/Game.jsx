import { useState } from 'react';
import InputNumber from './InputNumber';
import Message from './Message';
import RestartButton from './RestartButton';

function Game() {
  // Estado para el número objetivo aleatorio entre 1 y 100
  const [targetNumber, setTargetNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  // Estado para el valor del número ingresado por el usuario
  const [userGuess, setUserGuess] = useState('');
  // Estado para el mensaje de retroalimentación o pista
  const [message, setMessage] = useState('');
  // Estado para saber si el juego terminó
  const [isGameOver, setIsGameOver] = useState(false);
  // Contador de intentos del usuario
  const [attempts, setAttempts] = useState(0);

  // Manejar el cambio en el input
  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
  };

  // Comparar el número ingresado con el generado
  const handleGuessSubmit = (e) => {
    if (e) e.preventDefault();
    
    const num = parseInt(userGuess);
    if (isNaN(num)) {
      setMessage('Por favor ingresa un número válido.');
      return;
    }

    const nuevosIntentos = attempts + 1;
    setAttempts(nuevosIntentos);

    // Comparación y renderización condicional del mensaje
    if (num === targetNumber) {
      setMessage('¡Correcto!');
      setIsGameOver(true);
    } else if (num < targetNumber) {
      setMessage('El número es mayor');
    } else {
      setMessage('El número es menor');
    }
  };

  // Reiniciar el juego generando un nuevo número aleatorio
  const handleRestart = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setUserGuess('');
    setMessage('');
    setIsGameOver(false);
    setAttempts(0);
  };

  return (
    <div className="game-card">
      <div className="game-header">
        <h2>Adivina el Número</h2>
        <p className="subtitle">Elige un número entre 1 y 100</p>
      </div>

      <div className="attempts-badge">
        <span>Intentos realizados: <strong>{attempts}</strong></span>
      </div>

      {/* Componente para capturar la entrada del usuario */}
      <InputNumber
        value={userGuess}
        onChange={handleInputChange}
        onSubmit={handleGuessSubmit}
        disabled={isGameOver}
      />
      
      {/* Componente para mostrar mensajes y pistas */}
      <Message message={message} />
      
      {/* Renderización condicional del botón de reinicio */}
      {isGameOver && <RestartButton onRestart={handleRestart} />}
    </div>
  );
}

export default Game;
