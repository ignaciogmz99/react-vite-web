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
        <h1>¿Quiénes somos?</h1>
      </div>

      <div className="menu-item location">
        <h1>¿Dónde estamos?</h1>
      </div>

      <div
        className="menu-item experience"
        onMouseEnter={() => setShowImages(true)}
        onMouseLeave={() => setShowImages(false)}
      >
        <h1>Experiencia</h1>

        {showImages && (
          <div className="images">
            <img src={exp1} alt="exp1" />
            <img src={exp2}  alt="exp2" />
            <img src={exp3}  alt="exp3" />
          </div>
        )}
      </div>

    </div>
  );
}

export default SideMenu;
