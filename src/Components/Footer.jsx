import { useNavigate, useLocation } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleViajesClick = () => {
    if (location.pathname === "/viajes") {
      navigate("/");
    } else {
      navigate("/viajes");
    }
  };

  // 🔥 URLs redes sociales (pon las reales luego)
  const openFacebook = () => {
    window.open("https://www.facebook.com/", "_blank");
  };

  const openInstagram = () => {
    window.open("https://www.instagram.com/", "_blank");
  };

  return (
    <div className="footer">

      <button className="footer-btn viajes" onClick={handleViajesClick}>
        Viajes ✈️
      </button>

      <button className="footer-btn facebook" onClick={openFacebook}>
        Facebook
      </button>

      <button className="footer-btn instagram" onClick={openInstagram}>
        Instagram
      </button>

    </div>
  );
}

export default Footer;