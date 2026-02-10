import "./Layout.css";
import { Routes, Route } from "react-router-dom";

import MainContent from "./MainContent.jsx";

function Layout() {
  return (
    <div className="layout">
      <div className="center">
        <MainContent/>
      </div>
    </div>
  );
}

export default Layout;