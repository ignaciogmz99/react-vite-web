import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleViajesClick = () => {
    if (location.pathname === "/viajes") {
      navigate("/");          // regresar a MainContent
    } else {
      navigate("/viajes");    // ir a Viajes
    }
  };

  return (
    <div className="footer">
      <div>
        <p>Valor actual: {count}</p>
        <button onClick={() => setCount(count + 1)}>Incrementar</button>
      </div>

      <div>
        <button onClick={() => setCount(count - 1)}>Decrementar</button>
      </div>

      <div>
        <button className="go-viajes" onClick={handleViajesClick}>
          {location.pathname === "/viajes" ? "Volver al Inicio 🏠" : "Ir a Viajes ✈️"}
        </button>
      </div>
    </div>
  );
}

export default Footer;
