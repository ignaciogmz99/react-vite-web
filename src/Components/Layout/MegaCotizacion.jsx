import { useEffect, useMemo, useRef, useState } from "react";
import "./MegaCotizacion.css";

const DESTINOS = [
  { id: "ofertas", label: "Nuestras Mejores Ofertas", url: "https://www.megatravel.com.mx/tools/ofertas-viaje.php" },
  { id: "promo", label: "Promociones Vigentes", url: "https://www.megatravel.com.mx/tools/vi.php" },
  { id: "1", label: "Europa", url: "https://www.megatravel.com.mx/tools/vi.php?Dest=1" },
  { id: "2", label: "Medio Oriente", url: "https://www.megatravel.com.mx/tools/vi.php?Dest=2" },
  { id: "3", label: "Canada", url: "https://www.megatravel.com.mx/tools/vi.php?Dest=3" },
  { id: "4", label: "Asia", url: "https://www.megatravel.com.mx/tools/vi.php?Dest=4" },
  { id: "5", label: "Africa", url: "https://www.megatravel.com.mx/tools/vi.php?Dest=5" },
  { id: "6", label: "Pacifico", url: "https://www.megatravel.com.mx/tools/vi.php?Dest=6" },
  { id: "7", label: "Sudamerica", url: "https://www.megatravel.com.mx/tools/vi.php?Dest=7" },
  { id: "8", label: "Estados Unidos", url: "https://www.megatravel.com.mx/tools/vi.php?Dest=8" },
  { id: "9", label: "Centroamerica", url: "https://www.megatravel.com.mx/tools/vi.php?Dest=9" },
  { id: "10", label: "Cuba y el Caribe", url: "https://www.megatravel.com.mx/tools/vi.php?Dest=10" },
  { id: "11", label: "Nacionales", url: "https://www.megatravel.com.mx/tools/vi.php?Dest=11" },
  { id: "12", label: "Eventos Especiales", url: "https://www.megatravel.com.mx/tools/vi.php?Dest=12" },
  { id: "13", label: "Cruceros", url: "https://www.megatravel.com.mx/tools/vi.php?Dest=13" },
];

function MegaCotizacion() {
  const [destinoId, setDestinoId] = useState("2");
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const minLoaderTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (minLoaderTimerRef.current) {
        clearTimeout(minLoaderTimerRef.current);
      }
    };
  }, []);

  const destinoActual = useMemo(
    () => DESTINOS.find((item) => item.id === destinoId) ?? DESTINOS[3],
    [destinoId]
  );

  const iframeSrc = useMemo(() => {
    const joiner = destinoActual.url.includes("?") ? "&" : "?";
    return `${destinoActual.url}${joiner}r=${reloadKey}`;
  }, [destinoActual.url, reloadKey]);

  const changeDestino = (nextId) => {
    if (minLoaderTimerRef.current) {
      clearTimeout(minLoaderTimerRef.current);
      minLoaderTimerRef.current = null;
    }
    setIsLoading(true);
    setDestinoId(nextId);
    setReloadKey((prev) => prev + 1);
  };

  const handleIframeLoaded = () => {
    // Keep the loader visible briefly so users can perceive the state change.
    minLoaderTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      minLoaderTimerRef.current = null;
    }, 350);
  };

  return (
    <section className="mega-wrap">
      <div className="mega-shell">
        <div className="mega-head">
          <div>
            <p className="mega-kicker">Cotizacion en linea</p>
            <h2 className="mega-title">Mega Conexion</h2>
          </div>
        </div>

        <div className="mega-controls">
          <label className="mega-label" htmlFor="mega-destino">
            Destino
          </label>
          <select
            id="mega-destino"
            className="mega-select"
            value={destinoId}
            onChange={(e) => changeDestino(e.target.value)}
          >
            {DESTINOS.map((destino) => (
              <option key={destino.id} value={destino.id}>
                {destino.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mega-frame-wrap">
          {isLoading && (
            <div className="mega-loader" aria-live="polite">
              <span className="mega-spinner" aria-hidden="true" />
              <span>Cargando cotizacion...</span>
            </div>
          )}
          <iframe
            key={iframeSrc}
            className={`mega-iframe ${isLoading ? "is-loading" : ""}`}
            src={iframeSrc}
            title={`Cotizacion ${destinoActual.label}`}
            loading="lazy"
            allowTransparency="true"
            onLoad={handleIframeLoaded}
            onError={handleIframeLoaded}
          />
        </div>
      </div>
    </section>
  );
}

export default MegaCotizacion;
