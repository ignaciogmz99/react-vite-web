import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

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
        <button className="go-viajes" onClick={() => navigate("/viajes")}>
          Ir a Viajes ✈️
        </button>
      </div>
    </div>
  );
}

export default Footer;
