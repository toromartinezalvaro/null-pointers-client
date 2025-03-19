import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import styles from "../styles/destino.css";
import { destinoService } from "../services/destinoService";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const destinosConfig = {
  "Playa del Carmen,México": {
    america: "Playa del Carmen",
    europa: "Santorini",
    srcA: "/imagenes/PlayaDelCarmen.jpg",
    srcE: "/imagenes/Santorini.jpg",
    datosA: ["México", "Español", "Chichén-Itzá", "Salbutes"],
    datosE: ["Grecia", "Griego", "Oia", "Hummus de Fava"]
  },
  "Cartagena,Colombia": {
    america: "Cartagena",
    europa: "Barcelona",
    srcA: "/imagenes/Cartagena.jpg",
    srcE: "/imagenes/Barcelona.jpg",
    datosA: ["Colombia", "Español", "Castillo San Felipe", "Cazuela de Mariscos"],
    datosE: ["España", "Castellano/Catalán", "Sagrada Familia", "Pa amb tomàquet"]
  },
  "Rio de Jainero,Brasil": {
    america: "Río de Janeiro",
    europa: "Lisboa",
    srcA: "/imagenes/RioDeJaneiro.jpg",
    srcE: "/imagenes/Lisboa.jpg",
    datosA: ["Brasil", "Portugués", "Cristo Redentor", "Feijoada"],
    datosE: ["Portugal", "Portugués", "Torre de Belém", "Bacalhau à Brás"]
  },
  "Bariloche,Argentina": {
    america: "Bariloche",
    europa: "Interlaaken",
    srcA: "/imagenes/Bariloche.jpg",
    srcE: "/imagenes/Interlaaken.jpg",
    datosA: ["Argentina", "Español", "Cerro Catedral", "Trucha a la parrilla"],
    datosE: ["Suiza", "Alemán/Francés/Italiano", "Jungfraujoch", "Fondue"]
  },
  "Cusco,Perú": {
    america: "Cusco",
    europa:"Granada",
    srcA: "/imagenes/Cusco.jpg",  
    srcE: "/imagenes/Granada.jpg",
    datosA: ["Perú", "Español/Quechua", "Machu Picchu", "Cuy"],
    datosE: ["España", "Castellano/Catalán", "Alhambra", "Tortilla Española"]
  },
  "Banff,Canadá": {
    america: "Banff",
    europa: "Zermatt",
    srcA: "/imagenes/Banff.jpg",
    srcE: "/imagenes/Zermatt.jpg",
    datosA: ["Canadá", "Inglés/Francés", "Lago Moraine", "Poutine"],
    datosE: ["Suiza", "Alemán/Francés/Italiano", "Matterhorn", "Raclette"]
  },
  "Nueva York,Estados Unidos": {
    america: "Nueva York",
    europa: "París",
    srcA: "/imagenes/NuevaYork.jpg",
    srcE: "/imagenes/Paris.jpg",
    datosA: ["Estados Unidos", "Inglés", "Central Park", "Hot Dog"],
    datosE: ["Francia", "Francés", "Torre Eiffel", "Croissant"]
  },
  "Miami,Estados Unidos": {
    america: "Miami",
    europa:"Viena,",
    srcA: "/imagenes/Miami.jpg",
    srcE: "/imagenes/Viena.jpg",
    datosA: ["Estados Unidos", "Inglés", "Ocean Drive", "Cubano"],
    datosE: ["Austria", "Alemán", "Palacio de Schönbrunn", "Wiener Schnitzel"]
  },
  "Toronto,Canadá": {
    america: "Toronto",
    europa:"Berlín",
    srcA: "/imagenes/Toronto.jpg",
    srcE: "/imagenes/Berlin.jpg",
    datosA: ["Canadá", "Inglés/Francés", "Casa Loma", "Poutine"],
    datosE: ["Alemania", "Alemán", "Puerta de Brandeburgo", "Currywurst"]
  },
  "TulumRio": {
    america: "Tulum",
    europa: "Ibiza",
    srcA: "/imagenes/Tulum.jpg",
    srcE: "/imagenes/ibiza.jpg",
    datosA: ["México", "Español", "Cenote Calavera", "Ceviche de Pescado"],
    datosE: ["España", "Castellano/Catalán", "Islote Es Vedrá", "Sofrit pagès"]
  },
  "Ushuaia": {  
    america: "Ushuaia",
    europa: "Reykjavik",
    srcA: "/imagenes/Ushuaia.jpg",
    srcE: "/imagenes/Reykjavik.jpg",
    datosA: ["Argentina", "Español", "Parque Nacional Tierra del Fuego", "Centolla"],
    datosE: ["Islandia", "Islandés", "Blue Lagoon", "Plokkfiskur"]
  },
  "Punta Cana": { 
    america: "Punta Cana",
    europa:"Algarve",
    srcA: "/imagenes/PuntaCana.jpg",
    srcE: "/imagenes/Algarve.jpg",
    datosA: ["República Dominicana", "Español", "Playa Bávaro", "Mofongo"],
    datosE: ["Portugal", "Portugués", "Praia da Marinha", "Cataplana"]
  },
  "Chicago": {
    america: "Chicago",
    europa:"Londres",
    srcA: "/imagenes/Chicago.jpg",
    srcE: "/imagenes/Londres.jpg",
    datosA: ["Estados Unidos", "Inglés", "Millennium Park", "Deep Dish Pizza"],
    datosE: ["Inglaterra", "Inglés", "Big Ben", "Fish and Chips"]
  },
  "San Juan": {
    america:"San Juan",
    europa: "Niza",
    srcA: "/imagenes/SanJuan.jpg",
    srcE: "/imagenes/Niza.jpg",
    datosA: ["Puerto Rico", "Español", "El Yunque", "Mofongo"],
    datosE: ["Francia", "Francés", "Promenade des Anglais", "Salade Niçoise"]
  },
  "Machu Picchu": {
    america: "Machu Picchu",
    europa: "Chamonix",
    srcA: "/imagenes/MachuPicchu.jpg",
    srcE: "/imagenes/Chamonix.jpg",
    datosA: ["Perú", "Español/Quechua", "Machu Picchu", "Cuy"],
    datosE: ["Francia", "Francés", "Mont Blanc", "Fondue"]
  },
  "Los Angeles": {  
    america: "Los Angeles",
    europa: "Roma",
    srcA: "/imagenes/LosAngeles.jpg",
    srcE: "/imagenes/Roma.jpg",
    datosA: ["Estados Unidos", "Inglés", "Hollywood", "In-N-Out Burger"],
    datosE: ["Italia", "Italiano", "Coliseo", "Gelato"]
  },
  "Honolulu": {
    america: "Honolulu",
    europa: "Malta",
    srcA: "/imagenes/Honolulu.jpg",
    srcE: "/imagenes/Malta.jpg",
    datosA: ["Hawái", "Inglés/Hawaiano", "Playa Hapuna", "Saimin"],
    datosE: ["Malta", "Inglés/Maltés", "La Valeta", "Aljotta"]
  },
  "Aspen": {
    america: "Aspen",
    europa: "Innsbruck",
    srcA: "/imagenes/Aspen.jpg",
    srcE: "/imagenes/Innsbruck.jpg",
    datosA: ["Estados Unidos", "Inglés", "Aspen Mountain", "Buffalo Burger"],
    datosE: ["Austria", "Alemán", "Golden Roof", "Wiener Schnitzel"]
  },
  "Ciudad de México": {
    america: "Ciudad de México",
    europa: "Madrid",
    srcA: "/imagenes/CiudadDeMexico.jpg",
    srcE: "/imagenes/Madrid.jpg",
    datosA: ["México", "Español", "Palacio de Bellas Artes", "Tacos al Pastor"],
    datosE: ["España", "Castellano/Catalán", "Plaza Mayor", "Paella"]
  },
  // Hasta aquí todas las combinaciones de la tabla
  "Bora Bora": {
    america: "Bora Bora",
    europa: "Dubai",
    srcA: "/imagenes/BoraBora.jpg", 
    srcE: "/imagenes/Dubai.jpg",
    datosA: ["Polinesia Francesa", "Francés", "Monte Otemanu", "Poisson Cru"],
    datosE: ["Emiratos Árabes Unidos", "Árabe", "Burj Khalifa", "Shawarma"]
  }, // Destino por defecto
};

type DestinoKey = keyof typeof destinosConfig;

interface Destino {
    america: string;
    europa: string;
    srcA: string;
    srcE: string;
    datosA: string[];
    datosE: string[];
    control?: boolean;
}

interface SeleccionarDestinoProps {
    destinoA: DestinoKey;
    setAmerica: React.Dispatch<React.SetStateAction<string>>;
    setEuropa: React.Dispatch<React.SetStateAction<string>>;
    setSrcA: React.Dispatch<React.SetStateAction<string>>;
    setSrcE: React.Dispatch<React.SetStateAction<string>>;
    setDatosA: React.Dispatch<React.SetStateAction<string[]>>;
    setDatosE: React.Dispatch<React.SetStateAction<string[]>>;
    setControl: React.Dispatch<React.SetStateAction<boolean>>;
}

const seleccionarDestino = (
    destinoA: SeleccionarDestinoProps['destinoA'],
    setAmerica: SeleccionarDestinoProps['setAmerica'],
    setEuropa: SeleccionarDestinoProps['setEuropa'],
    setSrcA: SeleccionarDestinoProps['setSrcA'],
    setSrcE: SeleccionarDestinoProps['setSrcE'],
    setDatosA: SeleccionarDestinoProps['setDatosA'],
    setDatosE: SeleccionarDestinoProps['setDatosE'],
    setControl: SeleccionarDestinoProps['setControl'],
    ) => {
        const destino: Destino = destinosConfig[destinoA];
    if (destino) {
        setAmerica(destino.america);
        setEuropa(destino.europa);
        setSrcA(destino.srcA);
        setSrcE(destino.srcE);
        setDatosA(destino.datosA);
        setDatosE(destino.datosE);
    }
};

export default function Destino() {
  const navigate = useNavigate();
  const [america, setAmerica] = useState("");
  const [europa, setEuropa] = useState("");
  const [srcA, setSrcA] = useState("");
  const [srcE, setSrcE] = useState("");
  const [datosA, setDatosA] = useState<string[]>([]);
  const [datosE, setDatosE] = useState<string[]>([]);
  const [control, setControl] = useState(true);

  useEffect(() => {
    seleccionarDestino(destinoService.destinoA as DestinoKey, setAmerica, setEuropa, setSrcA, setSrcE, setDatosA, setDatosE, setControl);
  }, []);

  return (
    <main className="container">
      <h1 className="container__titulo">Tus Destinos:</h1>

      {!control && (
        <div>
          <h3 className="container__titulo">
            Tus Gustos son bastante exóticos, te sugerimos los siguientes lugares:
          </h3>
        </div>
      )}

      <div className="container--opciones">
        <section className="opciones--opcion">
          <div className="opcion__encabezado">
            <button className="opcion__encabezado__nombre" onClick={() => seleccionarDestino(destinoService.destinoA as DestinoKey, setAmerica, setEuropa, setSrcA, setSrcE, setDatosA, setDatosE, setControl)}>Aventura en América</button>
          </div>

          <div className="opcion__destino">
            <input value={america} className="opcion__encabezado__destino focus-in-expand" type="text" readOnly id="destinoAmerica" />
          </div>

          <div className="opcion__imagen">
            <img src={srcA} alt="Destino en America" id="imagenAmerica" />
            <div className="overlay">
              <div className="text">
                <p>Pais:</p> <input className="text__input" type="text" value={datosA[0]} readOnly />
                <p>Idioma:</p><input className="text__input" type="text" value={datosA[1]} readOnly />
                <p>Lugar Imperdible:</p><input className="text__input" type="text" value={datosA[2]} readOnly />
                <p>Comida típica:</p><input className="text__input" type="text" value={datosA[3]} readOnly />
              </div>
            </div>
          </div>

          <div className="opcion__link__item">
            <a href="/planes"><img src="/imagenes/paquete.png" alt="Explora tus opciones" /></a>
            <span className="tooltiptext">Explora tus opciones</span>
          </div>
        </section>

        <section className="opciones--opcion">
          <div className="opcion__encabezado">
            <h2 className="opcion__encabezado__nombre">Aventura en Europa</h2>
          </div>

          <div className="opcion__destino">
            <input value={europa} className="opcion__encabezado__destino focus-in-expand" type="text" readOnly id="destinoEuropa" />
          </div>

          <div className="opcion__imagen">
            <img src={srcE} alt="Destino en Europa" id="imagenEuropa" />
            <div className="overlay">
              <div className="text">
                <p>Pais:</p> <input className="text__input" type="text" value={datosE[0]} readOnly />
                <p>Idioma:</p><input className="text__input" type="text" value={datosE[1]} readOnly />
                <p>Lugar Imperdible:</p><input className="text__input" type="text" value={datosE[2]} readOnly />
                <p>Comida típica:</p><input className="text__input" type="text" value={datosE[3]} readOnly />
              </div>
            </div>
          </div>

          <div className="opcion__link__item">
          <button onClick={() => navigate("/planes")}>
              <img src="/imagenes/paquete.png" alt="Explora tus opciones" />
            </button>
            <span className="tooltiptext">Explora tus opciones</span>
          </div>
        </section>
      </div>
    </main>
  );
}