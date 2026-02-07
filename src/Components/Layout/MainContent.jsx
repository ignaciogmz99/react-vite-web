import { useEffect, useRef, useState } from "react";
import "./MainContent.css";
import heroImg from "../../assets/test5.jpg";

// ✅ imágenes
import pack1 from "../../assets/foto1.jpg";
import pack2 from "../../assets/foto2.jpg";
import pack3 from "../../assets/foto3.jpg";
import pack4 from "../../assets/foto5.jpg";
import pack5 from "../../assets/foto5.jpg";

function MainContent() {
  const categorias = [
    { icon: "🎄", label: "Navidades" },
    { icon: "🏖️", label: "Playa" },
    { icon: "👨‍👩‍👧‍👦", label: "Familia" },
    { icon: "☀️", label: "Verano" },
    { icon: "❤️", label: "Romántico" },
    { icon: "🍽️", label: "Gastronomía" },
    { icon: "🏛️", label: "Historia" },
    { icon: "🏙️", label: "Ciudad" },
    { icon: "🌊", label: "Playas de México" },
  ];

  const paquetes = [
    { id: 1, title: "Nueva York Clásica", nights: "4 noches", from: "Desde", price: "26,587 MXN", img: pack1 },
    { id: 2, title: "Lisboa + Madrid", nights: "20 noches", from: "Desde", price: "99,527 MXN", img: pack2 },
    { id: 3, title: "Lisboa + Oporto", nights: "13 noches", from: "Desde", price: "71,769 MXN", img: pack3 },
    { id: 4, title: "Andalucía + Costa del Sol", nights: "9 noches", from: "Desde", price: "47,116 MXN", img: pack4 },
    { id: 5, title: "Andalucía + Costa del Sol", nights: "9 noches", from: "Desde", price: "47,116 MXN", img: pack5 },
  ];

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

  // ✅ si el usuario hace scroll horizontal manual, actualizamos el dot “aproximado”
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

  // ✅ FIX: evita que el carrusel “se trague” el scroll vertical del mouse/touchpad
  const onTrackWheel = (e) => {
  const track = trackRef.current;
  if (!track) return;

  // Si el usuario quiere horizontal (shift o deltaX fuerte), dejamos al carrusel
  if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

  // ✅ Siempre manda el scroll vertical al contenedor que scrollea (.center)
  const vertical = track.closest(".center") || document.scrollingElement;
  if (!vertical) return;

  vertical.scrollBy({ top: e.deltaY, behavior: "auto" });
  e.preventDefault(); // evita que el carrusel "secuestré" el wheel
};

  

  return (
    <div className="main">
      {/* HERO FULL WIDTH */}
      <section className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Best by Travel</h1>
          <p>Agencia de viajes en Plaza Arboledas</p>
        </div>
      </section>

      <div className="page-padding">
        {/* ✅ BARRA DE CATEGORÍAS */}
        <section className="catbar">
          <div className="catbar-inner">
            {categorias.map((c) => (
              <button key={c.label} className="cat-item" type="button">
                <div className="cat-icon" aria-hidden="true">
                  {c.icon}
                </div>
                <div className="cat-label">{c.label}</div>
              </button>
            ))}
          </div>
        </section>

        {/* ✅ CARRUSEL */}
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
    </div>
  );
}

export default MainContent;