import "./App.css";

import { BrowserRouter } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="Principal">
        <div className="Navbar">
          <Navbar />
        </div>
        <div className="Layout">
          <Layout />
        </div>
        <div className="Footer">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
