import "./Layout.css";
import { Routes, Route } from "react-router-dom";

import SideMenu from "./SideMenu.jsx";
import MainContent from "./MainContent.jsx";
import Viajes from "../../pages/Viajes.jsx";

function Layout() {
  return (
    <div className="layout">
      <div className="left">
        <SideMenu />
      </div>
      <div className="right">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/viajes" element={<Viajes />} />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
