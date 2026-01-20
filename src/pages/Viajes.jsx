import "./Viajes.css";

function Viajes() {
  const viajes = [
    { id: 1, destino: "Cancún", dias: "5 días / 4 noches", precio: "$8,999 MXN" },
    { id: 2, destino: "CDMX", dias: "3 días / 2 noches", precio: "$3,499 MXN" },
    { id: 3, destino: "Los Cabos", dias: "4 días / 3 noches", precio: "$7,200 MXN" },
  ];

  return (
    <div className="viajes">
      <h1>Viajes disponibles ✈️</h1>

      <div className="cards">
        {viajes.map((v) => (
          <div className="card" key={v.id}>
            <h3>{v.destino}</h3>
            <p>{v.dias}</p>
            <p className="price">{v.precio}</p>
            <button className="card-btn">Ver detalles</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Viajes;
