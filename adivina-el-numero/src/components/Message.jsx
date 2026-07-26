// Componente para mostrar pistas o mensajes de éxito
function Message({ message }) {
  // Renderización condicional: si no hay mensaje, no muestra nada
  if (!message) return null;

  return (
    <div className={`message ${message === '¡Correcto!' ? 'message-success' : 'message-info'}`}>
      <p>{message}</p>
    </div>
  );
}

export default Message;
