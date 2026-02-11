import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.jpeg";

function Navbar() {
  const [open, setOpen] = useState(null); // "contacto" | "direccion" | "quienes" | null
  const wrapperRef = useRef(null);

  useEffect(() => {
    const onPointerDown = (e) => {
      if (!open) return;

      // ✅ Si tocaste dentro del popover, NO cierres (esto arregla el link en móvil)
      if (e.target.closest(".menu-popover")) return;

      // Si tocaste fuera del wrapper, cierra
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(null);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(null);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const toggle = (key) => setOpen((prev) => (prev === key ? null : key));

  const googleMapsUrl = "https://maps.app.goo.gl/6zLmp1wdZVnfDDgJ7";
  const direccionTexto =
    "Plaza Fiesta Arboledas 2500, Local 7H, Guadalajara, Mexico, 44530";

  return (
    <>
      {/* ✅ Overlay TRANSPARENTE: no oscurece, pero deja cerrar tocando fuera */}
      

      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Best By Travel Logo" className="logo" />
        </div>

        <ul className="navbar-menu" ref={wrapperRef}>
          {/* ===== CONTACTO ===== */}
          <li className="menu-item-popover">
            <span
              className="menu-text-trigger"
              onClick={() => toggle("contacto")}
              role="button"
              tabIndex={0}
              aria-expanded={open === "contacto"}
              onKeyDown={(e) => e.key === "Enter" && toggle("contacto")}
            >
              Contacto
            </span>

            {open === "contacto" && (
              <div className="menu-popover" role="dialog" aria-modal="true">
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
              aria-expanded={open === "direccion"}
              onKeyDown={(e) => e.key === "Enter" && toggle("direccion")}
            >
              Dirección
            </span>

            {open === "direccion" && (
              <div className="menu-popover" role="dialog" aria-modal="true">
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
                    rel="noopener noreferrer"
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
              aria-expanded={open === "quienes"}
              onKeyDown={(e) => e.key === "Enter" && toggle("quienes")}
            >
              Quiénes somos
            </span>

            {open === "quienes" && (
              <div className="menu-popover" role="dialog" aria-modal="true">
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
                        En Best by Travel te ayudamos a organizar tus viajes. La mejor asesoría para tus viajes
                        alrededor del mundo🗽⛩🕌🏯🌁🕍🏔🏰
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;