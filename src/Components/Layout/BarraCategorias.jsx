import "./BarraCategorias.css";

function BarraCategorias({ categorias }) {
  return (
    <div className="page-padding">
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
    </div>
  );
}

export default BarraCategorias;