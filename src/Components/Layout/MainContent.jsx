import "./MainContent.css";
import heroImg from "../../assets/test8.jpg";

// ✅ imágenes
import pack1 from "../../assets/foto1.jpg";
import pack2 from "../../assets/foto2.jpg";
import pack3 from "../../assets/foto3.jpg";
import pack4 from "../../assets/foto5.jpg";
import pack5 from "../../assets/foto5.jpg";

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
    { id: 1, title: "Nueva York Clásica", nights: "4 noches", from: "Desde", price: "26,587 MXN", img: pack1 },
    { id: 2, title: "Lisboa + Madrid", nights: "20 noches", from: "Desde", price: "99,527 MXN", img: pack2 },
    { id: 3, title: "Lisboa + Oporto", nights: "13 noches", from: "Desde", price: "71,769 MXN", img: pack3 },
    { id: 4, title: "Andalucía + Costa del Sol", nights: "9 noches", from: "Desde", price: "47,116 MXN", img: pack4 },
    { id: 5, title: "Andalucía + Costa del Sol", nights: "9 noches", from: "Desde", price: "47,116 MXN", img: pack5 },
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