import "./MainContent.css";
import heroImg from "../../assets/test1.jpg"; // cambia ruta si es necesario

function MainContent() {
  return (
    <div className="main">

      {/* HERO FULL WIDTH SIN MÁRGENES */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="hero-overlay" />

        <div className="hero-content">
          <h1>Best by Travel</h1>
          <p>Agencia de viajes en Plaza Arboledas</p>
        </div>
      </section>

      {/* CONTENIDO NORMAL CON SANGRÍA */}
      <div className="page-padding">
        {/* aquí irá el resto de la página después */}
      </div>

    </div>
  );
}

export default MainContent;