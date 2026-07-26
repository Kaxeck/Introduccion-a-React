// Componente para reiniciar el juego
function RestartButton({ onRestart }) {
  return (
    <button type="button" onClick={onRestart} className="restart-button">
      Reiniciar Juego
    </button>
  );
}

export default RestartButton;
