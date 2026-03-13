import "./App.css";
import { useState } from "react";

import { BrowserRouter } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  const [activeView, setActiveView] = useState("home");

  const handleGoHome = () => {
    setActiveView("home");
  };

  const handleToggleCotizacion = () => {
    setActiveView("cotizacion");
  };

  const handleToggleMapamundi = () => {
    setActiveView("mapamundi");
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
            onGoHome={handleGoHome}
            onToggleCotizacion={handleToggleCotizacion}
            onToggleMapamundi={handleToggleMapamundi}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
