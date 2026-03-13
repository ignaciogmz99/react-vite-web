import { useMemo, useState } from "react";
import WorldMap from "react-svg-worldmap";
import topVisitedClimate from "../../data/topVisitedClimate.json";
import "./Mapamundi.css";

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function getComfortScore(temp) {
  const comfortPenalty = Math.abs(temp - 22) * 3;
  const heatPenalty = temp > 29 ? (temp - 29) * 8 : 0;
  const coldPenalty = temp < 12 ? (12 - temp) * 4 : 0;
  return Math.max(0, 100 - comfortPenalty - heatPenalty - coldPenalty);
}

function getHeatColor(temp) {
  if (temp <= 0) return "#d7ecff";
  if (temp <= 8) return "#b7dcff";
  if (temp <= 14) return "#90c2ff";
  if (temp <= 20) return "#f6d36c";
  if (temp <= 26) return "#f1a84c";
  return "#db6b38";
}

function getTempLabel(temp) {
  if (temp <= 8) return "frio";
  if (temp <= 16) return "templado";
  if (temp <= 26) return "calido";
  return "muy calido";
}

function getBestMonths(country) {
  return MONTHS.map((month, index) => ({
    month,
    temperature: country.monthlyTemperatureC[index],
    score: getComfortScore(country.monthlyTemperatureC[index]),
  }))
    .filter((item) => item.temperature >= 16 && item.temperature <= 26)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

function Mapamundi() {
  const countries = useMemo(
    () =>
      topVisitedClimate
        .filter((country) => country.cca2 && Array.isArray(country.monthlyTemperatureC))
        .map((country) => ({
          ...country,
          bestMonths: getBestMonths(country),
        })),
    []
  );

  const [selectedCountryCode, setSelectedCountryCode] = useState("fr");
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(4);
  const [showBestOnly, setShowBestOnly] = useState(false);

  const selectedCountry =
    countries.find((country) => country.cca2 === selectedCountryCode) ??
    countries.find((country) => country.cca2 === "fr") ??
    countries[0];

  const mapData = useMemo(
    () =>
      countries.map((country) => ({
        country: country.cca2,
        value: country.monthlyTemperatureC[selectedMonthIndex],
      })),
    [countries, selectedMonthIndex]
  );

  const visibleMonths = useMemo(() => {
    const months = MONTHS.map((month, index) => ({
      month,
      temperature: selectedCountry.monthlyTemperatureC[index],
      score: getComfortScore(selectedCountry.monthlyTemperatureC[index]),
      recommended: selectedCountry.bestMonths.some((item) => item.month === month),
    }));

    return showBestOnly ? months.filter((item) => item.recommended) : months;
  }, [selectedCountry, showBestOnly]);

  return (
    <section className="mapamundi page-padding">
      <div className="mapamundi-hero">
        <div className="mapamundi-copyblock">
          <p className="mapamundi-kicker">Top 100 paises mas visitados</p>
          <h2>Mapa de calor mensual con base local de temperatura historica</h2>
          <p className="mapamundi-copy">
            El mapa ahora cubre 100 paises del ranking de llegadas turisticas y pinta cada pais por su
            temperatura promedio del mes seleccionado. La recomendacion se infiere por confort termico.
          </p>
        </div>

        <div className="mapamundi-actions">
          <p className="mapamundi-month-caption">Mes activo</p>
          <strong className="mapamundi-month-name">{MONTHS[selectedMonthIndex]}</strong>
          <button
            type="button"
            className={`season-btn ${showBestOnly ? "active" : ""}`}
            onClick={() => setShowBestOnly((prev) => !prev)}
          >
            Mejor epoca para viajar
          </button>
        </div>
      </div>

      <div className="month-selector" aria-label="Seleccionar mes">
        {MONTHS.map((month, index) => (
          <button
            key={month}
            type="button"
            className={`month-pill ${selectedMonthIndex === index ? "active" : ""}`}
            onClick={() => setSelectedMonthIndex(index)}
          >
            {month}
          </button>
        ))}
      </div>

      <div className="mapamundi-grid">
        <div className="world-card">
          <div className="world-map-shell">
            <WorldMap
              backgroundColor="#edf4ff"
              color="#f5c542"
              data={mapData}
              title="Temperatura promedio mensual"
              valueSuffix=" C"
              size="responsive"
              tooltipBgColor="#163f73"
              tooltipTextColor="#ffffff"
              tooltipTextFunction={({ countryName, countryValue }) =>
                `${countryName}: ${countryValue} C en ${MONTHS[selectedMonthIndex]}`
              }
              styleFunction={({ countryCode, countryValue }) => {
                const hasData = typeof countryValue === "number";
                const fill = hasData ? getHeatColor(countryValue) : "#dce6f2";
                const isSelected = selectedCountryCode === countryCode.toLowerCase();

                return {
                  fill,
                  stroke: isSelected ? "#163f73" : "#8aa3c2",
                  strokeWidth: isSelected ? 1.6 : 0.7,
                  strokeOpacity: 1,
                  cursor: hasData ? "pointer" : "default",
                  vectorEffect: "non-scaling-stroke",
                  outline: "none",
                };
              }}
              onClickFunction={({ countryCode }) => {
                const normalized = countryCode.toLowerCase();
                if (countries.some((country) => country.cca2 === normalized)) {
                  setSelectedCountryCode(normalized);
                }
              }}
            />
          </div>

          <div className="heat-legend">
            <span>Frio</span>
            <div className="heat-legend-bar" />
            <span>Calido</span>
          </div>
        </div>

        <aside className="climate-card">
          <p className="climate-region">Ranking turistico global</p>
          <h3>{selectedCountry.country}</h3>
          <p className="climate-copy">
            Rank #{selectedCountry.rank} en el listado cargado. Temperatura promedio para{" "}
            {MONTHS[selectedMonthIndex].toLowerCase()}: {selectedCountry.monthlyTemperatureC[selectedMonthIndex]} C.
          </p>

          <div className="climate-summary">
            <div>
              <span>Llegadas 2024</span>
              <strong>{selectedCountry.visitorsDisplay || "N/D"}</strong>
            </div>
            <div>
              <span>Confort en {MONTHS[selectedMonthIndex]}</span>
              <strong>{Math.round(getComfortScore(selectedCountry.monthlyTemperatureC[selectedMonthIndex]))}/100</strong>
            </div>
            <div>
              <span>Meses sugeridos</span>
              <strong>{selectedCountry.bestMonths.map((item) => item.month).join(", ") || "Sin meses ideales"}</strong>
            </div>
            <div>
              <span>Criterio</span>
              <strong>Temperatura moderada</strong>
            </div>
          </div>

          <div className="month-list">
            {visibleMonths.map((item) => (
              <article key={item.month} className={`month-card ${item.recommended ? "recommended" : ""}`}>
                <div className="month-head">
                  <strong>{item.month}</strong>
                  <span>{Math.round(item.score)}/100</span>
                </div>
                <div className="month-metrics">
                  <span>{item.temperature} C</span>
                  <span>{getTempLabel(item.temperature)}</span>
                  <span>{item.recommended ? "recomendado" : "regular"}</span>
                </div>
                <div className="month-bar">
                  <span style={{ width: `${Math.min(item.score, 100)}%` }} />
                </div>
              </article>
            ))}
          </div>

          <p className="mapamundi-note">
            Cobertura local de 100 paises basada en ranking de llegadas turisticas y promedios mensuales
            historicos por pais. La mejor epoca se infiere por confort termico.
          </p>
        </aside>
      </div>
    </section>
  );
}

export default Mapamundi;
