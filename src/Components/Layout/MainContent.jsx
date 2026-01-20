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
      <h1>API sencilla (Quotes)</h1>

      <button onClick={getQuote} disabled={loading}>
        Obtener frase
      </button>

      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}

      {quote && (
        <div className="quote-box">
          <p>"{quote}"</p>
          <p className="author">—{author}—</p>
          <p>—{length}— length of the quote</p>
        </div>
      )}
    </div>
  );
}

export default MainContent;
