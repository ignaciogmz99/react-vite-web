import "./MainContent.css";
import heroImg from "../../assets/test8.jpg";

// ✅ imágenes
import pack1 from "../../assets/turquia.png";
import pack2 from "../../assets/italiacarrusel.png";
import pack3 from "../../assets/japoncarrusel.png";
import pack4 from "../../assets/horizontesasiaticos.png";
import pack5 from "../../assets/vikingocarrusel.webp";
import pack6 from "../../assets/perucarrusel.png";
import pack7 from "../../assets/newyork.png";
import pack8 from "../../assets/centro.png";
import pack9 from "../../assets/maya.png";

import Banner from "./Banner";
import BarraCategorias from "./BarraCategorias";
import CarruselPaquetes from "./CarruselPaquetes";

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
    { id: 1, title: "", nights: "", from: "", price: "", img: pack1 },
    { id: 2, title: "", nights: "", from: "", price: "", img: pack2 },
    { id: 3, title: "", nights: "", from: "", price: "", img: pack3 },
    { id: 4, title: "", nights: "", from: "", price: "", img: pack4 },
    { id: 5, title: "", nights: "", from: "", price: "", img: pack5 },
    { id: 6, title: "", nights: "", from: "", price: "", img: pack6 },
    { id: 7, title: "", nights: "", from: "", price: "", img: pack7 },
    { id: 8, title: "", nights: "", from: "", price: "", img: pack8 },
    { id: 9, title: "", nights: "", from: "", price: "", img: pack9 },
  ];

  return (
    <>
      <Banner heroImg={heroImg} title="Best by Travel" subtitle="Agencia de viajes en Plaza Arboledas" />
      <BarraCategorias categorias={categorias} />
      <CarruselPaquetes paquetes={paquetes} />
    </>
  );
}

export default MainContent;