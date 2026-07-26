import { useState } from "react";

/**
 * Componente TweetForm
 * Permite al usuario redactar y publicar un nuevo tweet.
 * @param {Function} onAddTweet - Función prop invocada al enviar un tweet válido.
 */
const TweetForm = ({ onAddTweet }) => {
  // Estado local para almacenar el texto ingresado en la caja de texto
  const [text, setText] = useState("");

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de página por defecto

    // Si el texto está vacío o solo contiene espacios, no hacer nada
    if (!text.trim()) return;

    // Llama a la función proporcionada por el padre para agregar el tweet
    onAddTweet(text);

    // Limpia la caja de texto después de publicar
    setText("");
  };

  return (
    <form className="tweet-form-card" onSubmit={handleSubmit}>
      {/* Avatar representativo del usuario */}
      <div className="avatar">U</div>

      <div className="tweet-form-content">
        {/* Campo de entrada para redactar el mensaje */}
        <textarea
          className="tweet-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="¿Qué está pasando?"
          rows={3}
          maxLength={280}
        />

        {/* Acciones del formulario: contador de caracteres y botón de publicación */}
        <div className="tweet-form-actions">
          <span className="tweet-char-count">{280 - text.length}</span>
          <button type="submit" className="btn-tweet" disabled={!text.trim()}>
            Publicar
          </button>
        </div>

      </div>
    </form>
  );
};

export default TweetForm;
