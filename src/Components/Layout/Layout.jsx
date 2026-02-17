import "./Layout.css";
import MainContent from "./MainContent.jsx";
import MegaCotizacion from "./MegaCotizacion.jsx";

function Layout({ showCotizacion }) {
  return (
    <div className="layout">
      <div className={`center ${showCotizacion ? "center-cotizacion" : ""}`}>
        {showCotizacion ? <MegaCotizacion /> : <MainContent />}
      </div>
    </div>
  );
}

export default Layout;
