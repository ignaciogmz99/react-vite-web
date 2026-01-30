import { useState } from "react";
import "./MainContent.css";

function MainContent() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [length, setLength] = useState("");

  const getQuote = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();

      setQuote(data.content);
      setAuthor(data.author);
      setLength(data.length);
    } catch (e) {
      setError("Error al obtener la frase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      {/* ===== HERO ===== */}
      <section className="section hero">
        <h1>Best by Travel</h1>
        <p>Agencia de viajes en Plaza Arboledas</p>

        <button onClick={getQuote} disabled={loading}>
          Obtener frase
        </button>

        {loading && <p>Cargando...</p>}
        {error && <p className="error">{error}</p>}
      </section>

      {/* ===== QUOTE ===== */}
      {quote && (
        <section className="section quote">
          <div className="quote-box">
            <p>"{quote}"</p>
            <p className="author">— {author} —</p>
            <p className="length">Longitud: {length}</p>
          </div>
        </section>
      )}

      {/* ===== CONTENIDO LARGO ===== */}
      <section className="section content">
        <h2>Contenido largo para probar scroll</h2>

        {[...Array(20)].map((_, i) => (
          <p key={i}>
            Párrafo #{i + 1} — Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Commodi, distinctio, aspernatur nemo incidunt repellat vero.
          </p>
        ))}
      </section>

      {/* ===== FOOTER INTERNO ===== */}
      <section className="section end">
        <h3>Fin del contenido</h3>
        <p>Si llegaste aquí, el scroll funciona correctamente ✅</p>
      </section>
    </div>
  );
}

export default MainContent;
