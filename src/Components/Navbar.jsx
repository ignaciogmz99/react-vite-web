import "./Navbar.css";
import logo from "../assets/logo.jpeg"; // ✅ ESTA es la ruta correcta

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Best By Travel Logo" className="logo" />

        <span className="subtitle">Agencia de Viajes</span>
      </div>

      <ul className="navbar-menu">
        <li>Contacto </li>
      </ul>
    </nav>
  );
}

export default Navbar;
