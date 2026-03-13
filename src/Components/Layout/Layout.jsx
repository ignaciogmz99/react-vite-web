import "./Layout.css";
import MainContent from "./MainContent.jsx";
import MegaCotizacion from "./MegaCotizacion.jsx";
import Mapamundi from "./Mapamundi.jsx";

function Layout({ activeView }) {
  const isCotizacion = activeView === "cotizacion";

  return (
    <div className="layout">
      <div className={`center ${isCotizacion ? "center-cotizacion" : ""}`}>
        {activeView === "cotizacion" && <MegaCotizacion />}
        {activeView === "mapamundi" && <Mapamundi />}
        {activeView === "home" && <MainContent />}
      </div>
    </div>
  );
}

export default Layout;
