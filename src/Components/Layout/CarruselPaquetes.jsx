import { useRef } from "react";
import "./CarruselPaquetes.css";

function CarruselPaquetes({ paquetes }) {
  const trackRef = useRef(null);

  return (
    <div className="page-padding">
      <section className="deals">
        <div className="deals-head">
          <h2>Paquetes destacados</h2>
        </div>

        <div className="deals-track" ref={trackRef}>
          {paquetes.map((p) => (
            <article className="deal-card only-image" key={p.id}>
              <img className="deal-img" src={p.img} alt={p.title} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CarruselPaquetes;