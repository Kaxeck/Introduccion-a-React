import Tweet from "./Tweet";

/**
 * Componente TweetList
 * Recibe la lista de tweets y renderiza cada uno mediante el componente Tweet,
 * o muestra una interfaz limpia de estado vacío si no hay elementos.
 * @param {Array} tweets - Listado de tweets a mostrar
 * @param {Function} onLike - Función para manejar el evento de me gusta
 */
const TweetList = ({ tweets, onLike }) => {
  // Si no hay ningún tweet en la lista, mostrar el estado vacío
  if (tweets.length === 0) {
    return (
      <div className="empty-tweets">
        <div className="empty-tweets-icon">💬</div>
        <p style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
          No hay tweets aún
        </p>
        <p style={{ fontSize: "0.9rem" }}>
          ¡Sé el primero en compartir lo que piensas arriba!
        </p>
      </div>
    );
  }

  // Renderizar la lista iterando sobre el arreglo de tweets
  return (
    <div className="tweet-list">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} onLike={onLike} />
      ))}
    </div>
  );
};

export default TweetList;
