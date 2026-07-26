import { useState, useEffect } from "react";
import TweetList from "../components/TweetList";
import TweetForm from "../components/TweetForm";

// Componente para la página principal
const Home = ({ user, logout }) => {
  // Estado para guardar los tweets en localStorage
  const [tweets, setTweets] = useState(() => {
    const storedTweets = localStorage.getItem("tweets");
    return storedTweets ? JSON.parse(storedTweets) : [];
  });

  // Guardar en localStorage cada vez que cambia la lista
  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  // Función para crear un nuevo tweet
  const addTweet = (text) => {
    const newTweet = {
      id: Date.now(),
      author: user ? user.username : "Anónimo",
      text,
      likes: 0,
    };
    setTweets([newTweet, ...tweets]);
  };

  // Función para dar me gusta a un tweet
  const likeTweet = (id) => {
    setTweets(
      tweets.map((tweet) =>
        tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet
      )
    );
  };

  return (
    <div>
      {/* Encabezado con bienvenida y botón de cerrar sesión */}
      <div className="page-header">
        <h1 className="page-title">Bienvenido a Red Social</h1>
        {user && (
          <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ color: "var(--text-secondary)" }}>Hola, {user.username}!</p>
            <button
              onClick={logout}
              className="btn-like"
              style={{ border: "1px solid var(--border)", padding: "4px 12px" }}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      {/* Formulario y lista de publicaciones */}
      <TweetForm onAddTweet={addTweet} />
      <TweetList tweets={tweets} onLike={likeTweet} />
    </div>
  );
};

export default Home;
