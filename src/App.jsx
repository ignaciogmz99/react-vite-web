import "./App.css";
import { useState } from "react";

import { BrowserRouter } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  const [activeView, setActiveView] = useState("home");

  const handleToggleCotizacion = () => {
    setActiveView((prev) => (prev === "cotizacion" ? "home" : "cotizacion"));
  };

  const handleToggleMapamundi = () => {
    setActiveView((prev) => (prev === "mapamundi" ? "home" : "mapamundi"));
  };

  return (
    <BrowserRouter>
      <div className="Principal">
        <div className="Navbar">
          <Navbar />
        </div>
        <div className="Layout">
          <Layout activeView={activeView} />
        </div>
        <div className="Footer">
          <Footer
            activeView={activeView}
            onToggleCotizacion={handleToggleCotizacion}
            onToggleMapamundi={handleToggleMapamundi}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
