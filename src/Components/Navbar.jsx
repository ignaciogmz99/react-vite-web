import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.jpeg";

function Navbar() {
  const [open, setOpen] = useState(null); // "contacto" | "direccion" | "quienes" | null
  const wrapperRef = useRef(null);

  useEffect(() => {
    const onMouseDown = (e) => {
      if (open && wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(null);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(null);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const toggle = (key) => setOpen((prev) => (prev === key ? null : key));

  // ✅ Cambia esto por tu link real:
  const googleMapsUrl = "https://maps.app.goo.gl/6zLmp1wdZVnfDDgJ7";
  const direccionTexto = "Plaza Fiesta Arboledas 2500, Local 7H, Guadalajara, Mexico, 44530";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Best By Travel Logo" className="logo" />
        {/* <span className="subtitle"></span> */}
      </div>

      {/* ✅ Los 3 en línea */}
      <ul className="navbar-menu" ref={wrapperRef}>
        {/* ===== CONTACTO ===== */}
        <li className="menu-item-popover">
          <span
            className="menu-text-trigger"
            onClick={() => toggle("contacto")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && toggle("contacto")}
          >
            Contacto
          </span>

          {open === "contacto" && (
            <div className="menu-popover">
              <button className="menu-close" onClick={() => setOpen(null)}>
                ×
              </button>

              <div className="menu-popover-title">Contacto</div>

              <div className="menu-popover-body">
                <div className="menu-row">
                  <span className="menu-icon">📞</span>
                  <div>
                    <strong>Ignacio Gomez</strong>
                    <div className="menu-subtext">(+52) 33 1070 2655</div>
                  </div>
                </div>

                <div className="menu-row">
                  <span className="menu-icon">📞</span>
                  <div>
                    <strong>Karen Gomez</strong>
                    <div className="menu-subtext">(+52) 33 1109 0774</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </li>

        {/* ===== DIRECCIÓN ===== */}
        <li className="menu-item-popover">
          <span
            className="menu-text-trigger"
            onClick={() => toggle("direccion")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && toggle("direccion")}
          >
            Dirección
          </span>

          {open === "direccion" && (
            <div className="menu-popover">
              <button className="menu-close" onClick={() => setOpen(null)}>
                ×
              </button>

              <div className="menu-popover-title">Dirección</div>

              <div className="menu-popover-body">
                <div className="menu-row">
                  <span className="menu-icon">📍</span>
                  <div>
                    <strong>Ubicación</strong>
                    <div className="menu-subtext">{direccionTexto}</div>
                  </div>
                </div>

                <a
                  className="menu-link"
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver en Google Maps →
                </a>
              </div>
            </div>
          )}
        </li>

        {/* ===== QUIÉNES SOMOS ===== */}
        <li className="menu-item-popover">
          <span
            className="menu-text-trigger"
            onClick={() => toggle("quienes")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && toggle("quienes")}
          >
            Quiénes somos
          </span>

          {open === "quienes" && (
            <div className="menu-popover">
              <button className="menu-close" onClick={() => setOpen(null)}>
                ×
              </button>

              <div className="menu-popover-title">Quiénes somos</div>

              <div className="menu-popover-body">
                <div className="menu-row">
                  <span className="menu-icon">🏷️</span>
                  <div>
                    <strong>Best By Travel</strong>
                    <div className="menu-subtext">
                      En Best by Travel te ayudamos a organizar tus viajes.
                        La mejor asesoría para tus viajes alrededor del mundo🗽⛩🕌🏯🌁🕍🏔🏰
                    </div>
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