import "./Footer.css";

function Footer({ activeView, onToggleCotizacion, onToggleMapamundi }) {
  const openFacebook = () => {
    window.open("https://www.facebook.com/share/1Dj9BDc25m/?mibextid=wwXIfr", "_blank");
  };

  const openInstagram = () => {
    window.open(
      "https://www.instagram.com/bestbytravel?igsh=MTBrYzVvNmJ4Z21iNg%3D%3D&utm_source=qr",
      "_blank"
    );
  };

  return (
    <div className="footer">
      <button className="footer-btn facebook" onClick={openFacebook}>
        Facebook
      </button>

      <button className="footer-btn instagram" onClick={openInstagram}>
        Instagram
      </button>

      <button
        className={`footer-btn cotizacion ${activeView === "cotizacion" ? "active" : ""}`}
        onClick={onToggleCotizacion}
      >
        Cotizacion
      </button>

      <button
        className={`footer-btn mapamundi-btn ${activeView === "mapamundi" ? "active" : ""}`}
        onClick={onToggleMapamundi}
      >
        Mapamundi
      </button>
    </div>
  );
}

export default Footer;
