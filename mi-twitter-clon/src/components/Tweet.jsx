/**
 * Componente Tweet
 * Muestra un tweet individual con su autor, contenido y botón de interacción "Me gusta".
 * @param {Object} tweet - Objeto con datos del tweet ({ id, text, likes })
 * @param {Function} onLike - Callback para incrementar los likes del tweet
 */
const Tweet = ({ tweet, onLike }) => {
  // Determina si el tweet tiene al menos 1 me gusta para cambiar el estilo visual
  const isLiked = tweet.likes > 0;

  return (
    <article className="tweet-card">
      {/* Avatar del autor */}
      <div className="avatar">U</div>

      {/* Contenido principal del tweet */}
      <div className="tweet-body">
        {/* Cabecera con nombre de usuario e información */}
        <div className="tweet-header">
          <span className="tweet-author-name">{tweet.author || "Usuario"}</span>
          <span className="tweet-author-handle">
            @{tweet.author ? tweet.author.toLowerCase().replace(/\s+/g, "") : "usuario"} · ahora
          </span>
        </div>


        {/* Texto del tweet */}
        <p className="tweet-text">{tweet.text}</p>

        {/* Pie de tarjeta con botón de me gusta */}
        <div className="tweet-footer">
          <button
            className={`btn-like ${isLiked ? "liked" : ""}`}
            onClick={() => onLike(tweet.id)}
            title="Me gusta"
          >
            {/* Icono de corazón SVG */}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d={
                  isLiked
                    ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    : "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                }
              />
            </svg>
            <span>{tweet.likes}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default Tweet;
