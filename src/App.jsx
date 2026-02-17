import "./App.css";
import { useState } from "react";

import { BrowserRouter } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  const [showCotizacion, setShowCotizacion] = useState(false);

  const handleToggleCotizacion = () => {
    setShowCotizacion((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <div className="Principal">
        <div className="Navbar">
          <Navbar />
        </div>
        <div className="Layout">
          <Layout showCotizacion={showCotizacion} />
        </div>
        <div className="Footer">
          <Footer
            showCotizacion={showCotizacion}
            onToggleCotizacion={handleToggleCotizacion}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
