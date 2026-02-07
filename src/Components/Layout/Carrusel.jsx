import { useEffect, useRef, useState } from "react";
import "./CarruselPaquetes.css";

function CarruselPaquetes({ paquetes }) {
  const trackRef = useRef(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const measurePages = () => {
    const el = trackRef.current;
    if (!el) return;

    const card = el.querySelector(".deal-card");
    if (!card) return;

    const gap = parseFloat(getComputedStyle(el).gap || "0");
    const cardW = card.getBoundingClientRect().width + gap;
    const viewW = el.getBoundingClientRect().width;

    const perView = Math.max(1, Math.floor(viewW / cardW));
    const pages = Math.max(1, Math.ceil(paquetes.length / perView));

    setTotalPages(pages);
    setPage((p) => Math.min(p, pages - 1));
  };

  useEffect(() => {
    measurePages();
    window.addEventListener("resize", measurePages);
    return () => window.removeEventListener("resize", measurePages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paquetes.length]);

  const scrollToPage = (nextPage) => {
    const el = trackRef.current;
    if (!el) return;

    const card = el.querySelector(".deal-card");
    if (!card) return;

    const gap = parseFloat(getComputedStyle(el).gap || "0");
    const cardW = card.getBoundingClientRect().width + gap;
    const viewW = el.getBoundingClientRect().width;

    const perView = Math.max(1, Math.floor(viewW / cardW));
    const index = Math.min(paquetes.length - 1, nextPage * perView);

    const target = el.querySelectorAll(".deal-card")[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      setPage(nextPage);
    }
  };

  const prev = () => scrollToPage(Math.max(0, page - 1));
  const next = () => scrollToPage(Math.min(totalPages - 1, page + 1));

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;

    const card = el.querySelector(".deal-card");
    if (!card) return;

    const gap = parseFloat(getComputedStyle(el).gap || "0");
    const cardW = card.getBoundingClientRect().width + gap;
    const viewW = el.getBoundingClientRect().width;

    const perView = Math.max(1, Math.floor(viewW / cardW));
    const approxIndex = Math.round(el.scrollLeft / cardW);
    const approxPage = Math.min(totalPages - 1, Math.floor(approxIndex / perView));

    if (approxPage !== page) setPage(approxPage);
  };

  const onTrackWheel = (e) => {
    const track = trackRef.current;
    if (!track) return;

    // horizontal (shift o deltaX fuerte) => lo dejamos
    if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

    // manda vertical al contenedor que scrollea (.center)
    const vertical = track.closest(".center") || document.scrollingElement;
    if (!vertical) return;

    vertical.scrollBy({ top: e.deltaY, behavior: "auto" });
    e.preventDefault();
  };

  return (
    <div className="page-padding">
      <section className="deals">
        <div className="deals-head">
          <h2>Paquetes destacados</h2>

          <div className="deals-actions">
            <button className="nav-btn" onClick={prev} type="button" aria-label="Anterior">
              ‹
            </button>
            <button className="nav-btn" onClick={next} type="button" aria-label="Siguiente">
              ›
            </button>
          </div>
        </div>

        <div className="deals-wrap">
          <div
            className="deals-track"
            ref={trackRef}
            onScroll={onScroll}
            onWheelCapture={onTrackWheel}
            tabIndex={-1}
          >
            {paquetes.map((p) => (
              <article className="deal-card" key={p.id}>
                <img className="deal-img" src={p.img} alt={p.title} />
                <div className="deal-shade" />

                <div className="deal-content">
                  <h3 className="deal-title">{p.title}</h3>

                  <div className="deal-meta">
                    <span>{p.nights}</span>
                  </div>

                  <button className="deal-cta" type="button">
                    Paquete de vacaciones
                  </button>

                  <div className="deal-price">
                    <span className="deal-from">{p.from}</span>
                    <span className="deal-amount">{p.price}</span>
                    <span className="deal-person">Por persona</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="deals-dots" role="tablist" aria-label="Páginas del carrusel">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`dot ${i === page ? "active" : ""}`}
                onClick={() => scrollToPage(i)}
                type="button"
                aria-label={`Ir a página ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CarruselPaquetes;