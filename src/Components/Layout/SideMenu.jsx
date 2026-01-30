import { useState } from "react";
import "./SideMenu.css";
import exp1 from "./img/foto1.jpg";
import exp2 from "./img/foto2.jpg";
import exp3 from "./img/foto3.jpg";

function SideMenu() {
  const [showImages, setShowImages] = useState(false);

  return (
    <div className="Container">
      <div className="menu-item about">
        <div className="row">
          <div className="icon">👥</div>
          <div>
            <h3>¿Quiénes somos?</h3>
            <p>Conoce nuestra agencia y cómo trabajamos.</p>
          </div>
        </div>
      </div>

      <div className="menu-item location">
        <div className="row">
          <div className="icon">📍</div>
          <div>
            <h3>¿Dónde estamos?</h3>
            <p>Ubicación y formas de contacto.</p>
          </div>
        </div>
      </div>

      <div
        className="menu-item experience"
        onMouseEnter={() => setShowImages(true)}
        onMouseLeave={() => setShowImages(false)}
      >
        <div className="row">
          <div className="icon">⭐</div>
          <div>
            <h3>Experiencia</h3>
            <p>Galería de viajes y clientes satisfechos.</p>
          </div>
        </div>

        {showImages && (
          <div className="images">
            <img src={exp1} alt="exp1" />
            <img src={exp2} alt="exp2" />
            <img src={exp3} alt="exp3" />
          </div>
        )}
      </div>
    </div>
  );
}

export default SideMenu;
