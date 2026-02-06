import "./MainContent.css";
import heroImg from "../../assets/test1.jpg";

function MainContent() {
  const categorias = [
    { icon: "🎄", label: "Navidades" },
    { icon: "🏖️", label: "Playa" },
    { icon: "👨‍👩‍👧‍👦", label: "Familia" },
    { icon: "☀️", label: "Verano" },
    { icon: "❤️", label: "Romántico" },
    { icon: "🍽️", label: "Gastronomía" },
    { icon: "🏛️", label: "Historia" },
    { icon: "🏙️", label: "Ciudad" },
    { icon: "🌊", label: "Playas de México" },
  ];

  return (
    <div className="main">
      {/* HERO FULL WIDTH */}
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

      {/* ✅ BARRA DE CATEGORÍAS (debajo del hero) */}
      <div className="page-padding">
        <section className="catbar">
          <div className="catbar-inner">
            {categorias.map((c) => (
              <button key={c.label} className="cat-item" type="button">
                <div className="cat-icon" aria-hidden="true">{c.icon}</div>
                <div className="cat-label">{c.label}</div>
              </button>
            ))}
          </div>
        </section>

        {/* aquí irá el resto de la página después */}
      </div>
    </div>
  );
}

export default MainContent;