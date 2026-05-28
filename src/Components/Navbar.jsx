import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.jpeg";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/6zLmp1wdZVnfDDgJ7";
const DIRECCION_TEXTO =
  "Plaza Fiesta Arboledas 2500, Local 7H, Guadalajara, Mexico, 44530";
const FACEBOOK_URL = "https://www.facebook.com/share/1Dj9BDc25m/?mibextid=wwXIfr";
const INSTAGRAM_URL =
  "https://www.instagram.com/bestbytravel?igsh=MTBrYzVvNmJ4Z21iNg%3D%3D&utm_source=qr";

function Navbar({
  activeView,
  onGoHome,
  onToggleCotizacion,
  onToggleMapamundi,
}) {
  const [open, setOpen] = useState(null); // "menu" | "contacto" | "direccion" | "quienes" | null
  const wrapperRef = useRef(null);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!open) return;

      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(null);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(null);
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

  const toggle = (key) => {
    setOpen((prev) => (prev === key ? null : key));
  };

  const closeMenus = () => {
    setOpen(null);
  };

  const handleGoHome = () => {
    closeMenus();
    onGoHome?.();
  };

  const handleGoToCotizacion = () => {
    closeMenus();
    onToggleCotizacion?.();
  };

  const handleGoToMapamundi = () => {
    closeMenus();
    onToggleMapamundi?.();
  };

  return (
    <nav className="navbar" ref={wrapperRef}>
      <div className="navbar-left">
        <div className="menu-item-popover menu-item-popover--hamburger">
          <button
            type="button"
            className={`hamburger-btn ${open === "menu" ? "is-open" : ""}`}
            onClick={() => toggle("menu")}
            aria-expanded={open === "menu"}
            aria-label="Abrir menu principal"
          >
            <span className="hamburger-btn-bar" />
            <span className="hamburger-btn-bar" />
            <span className="hamburger-btn-bar" />
          </button>
        </div>

        <button
          type="button"
          className={`logo-button ${activeView === "home" ? "is-home" : ""}`}
          onClick={handleGoHome}
          aria-label="Ir a inicio"
        >
          <img src={logo} alt="Best By Travel Logo" className="logo" />
        </button>

        {open === "menu" && (
          <div
            className="menu-popover menu-popover--hamburger"
            role="dialog"
            aria-modal="true"
          >
            <button type="button" className="menu-close" onClick={closeMenus}>
              x
            </button>
            <div className="menu-popover-title">Menu</div>

            <div className="menu-popover-body">
              <a
                className="menu-action menu-action--facebook"
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenus}
              >
                Facebook
              </a>

              <a
                className="menu-action menu-action--instagram"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenus}
              >
                Instagram
              </a>

              <button
                type="button"
                className={`menu-action menu-action--cotizacion ${
                  activeView === "cotizacion" ? "is-active" : ""
                }`}
                onClick={handleGoToCotizacion}
              >
                Cotizacion
              </button>

              <button
                type="button"
                className={`menu-action menu-action--mapamundi ${
                  activeView === "mapamundi" ? "is-active" : ""
                }`}
                onClick={handleGoToMapamundi}
              >
                Mapamundi
              </button>
            </div>
          </div>
        )}
      </div>

      <ul className="navbar-menu">
        <li className="menu-item-popover">
          <button
            type="button"
            className="menu-text-trigger"
            onClick={() => toggle("contacto")}
            aria-expanded={open === "contacto"}
          >
            Contacto
          </button>

          {open === "contacto" && (
            <div
              className="menu-popover menu-popover--right-panel"
              role="dialog"
              aria-modal="true"
            >
              <button type="button" className="menu-close" onClick={closeMenus}>
                x
              </button>
              <div className="menu-popover-title">Contacto</div>

              <div className="menu-popover-body">
                <div className="menu-row">
                  <span className="menu-icon" aria-hidden="true">
                    📞
                  </span>
                  <div>
                    <strong>Ignacio Gomez</strong>
                    <div className="menu-subtext">(+52) 33 1070 2655</div>
                  </div>
                </div>

                <div className="menu-row">
                  <span className="menu-icon" aria-hidden="true">
                    📞
                  </span>
                  <div>
                    <strong>Karen Gomez</strong>
                    <div className="menu-subtext">(+52) 33 1109 0774</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </li>

        <li className="menu-item-popover">
          <button
            type="button"
            className="menu-text-trigger"
            onClick={() => toggle("direccion")}
            aria-expanded={open === "direccion"}
          >
            Dirección
          </button>

          {open === "direccion" && (
            <div
              className="menu-popover menu-popover--right-panel"
              role="dialog"
              aria-modal="true"
            >
              <button type="button" className="menu-close" onClick={closeMenus}>
                x
              </button>
              <div className="menu-popover-title">Dirección</div>

              <div className="menu-popover-body">
                <div className="menu-row">
                  <span className="menu-icon" aria-hidden="true">
                    📍
                  </span>
                  <div>
                    <strong>Ubicación</strong>
                    <div className="menu-subtext">{DIRECCION_TEXTO}</div>
                  </div>
                </div>

                <a
                  className="menu-link"
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenus}
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>
          )}
        </li>

        <li className="menu-item-popover">
          <button
            type="button"
            className="menu-text-trigger"
            onClick={() => toggle("quienes")}
            aria-expanded={open === "quienes"}
          >
            Quiénes somos
          </button>

          {open === "quienes" && (
            <div
              className="menu-popover menu-popover--right-panel"
              role="dialog"
              aria-modal="true"
            >
              <button type="button" className="menu-close" onClick={closeMenus}>
                x
              </button>
              <div className="menu-popover-title">Quiénes somos</div>

              <div className="menu-popover-body">
                <div className="menu-row">
                  <span className="menu-icon" aria-hidden="true">
                    🏷️
                  </span>
                  <div>
                    <strong>Best By Travel</strong>
                    <div className="menu-subtext">
                      En Best by Travel te ayudamos a organizar tus viajes. La
                      mejor asesoría para tus viajes alrededor del mundo🗽⛩🕌🏯🌁🕍🏔🏰
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
