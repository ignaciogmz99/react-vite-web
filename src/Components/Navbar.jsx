import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.jpeg";

function Navbar() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const onMouseDown = (e) => {
      if (open && wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Best By Travel Logo" className="logo" />
        <span className="subtitle">Agencia de Viajes</span>
      </div>

      <ul className="navbar-menu">
        <li className="contacto-item" ref={wrapperRef}>
          {/* Texto sin cambiar diseño */}
          <span
            className="contacto-text-trigger"
            onClick={() => setOpen((v) => !v)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setOpen((v) => !v)}
          >
            Contacto
          </span>

          {open && (
            <div className="contacto-popover">
              <button
                className="contacto-close"
                onClick={() => setOpen(false)}
              >
                ×
              </button>

              <div className="contacto-popover-title">Contacto</div>

              <div className="contacto-popover-body">
                <div className="contacto-row">
                  <span className="contacto-icon">📞</span>
                  <div>
                    <strong>Ignacio Gomez</strong>
                    <div className="contacto-number">(+52) 333 419 3334</div>
                  </div>
                </div>

                <div className="contacto-row">
                  <span className="contacto-icon">📞</span>
                  <div>
                    <strong>Karen Gomez</strong>
                    <div className="contacto-number">(+52) 334 012 1334</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
