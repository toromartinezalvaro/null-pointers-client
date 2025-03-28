/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json, Link, useNavigate, Navigate } from "@remix-run/react";
import styles from "~/styles/tarjetas.css?url";
import { useAuth } from "~/hooks/useAuth";

export const links = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async () => {
  return json({ Tarjetas: "Tarjetas" });
};

export default function Tarjetas() {
  const { authorized, reason } = useAuth(["CLIENT", "ADMIN"]);

  const navigate = useNavigate(); //navegar entre rutas
  const [indice, setIndice] = useState<number>(0); //indice de la pregunta
  const [respuestasSer, setRespuestasSer] = useState<string[]>([]);
  const [opcSelect, setOpcSelect] = useState(""); //opción seleccionada
  const [disSig, setDisSig] = useState(true); //ocultar siguiente
  const [disAtras, setDisAtras] = useState(true); //ocultar atras
  const [hidSig, setHidSig] = useState(false); //ocultar siguiente
  const [calcular, setCalcular] = useState(true); //calcular destino

  if (!authorized) {
    navigate("login");
  }

  const PreferenciasLabels = {
    PLAYA: "Playa",
    MONTANA: "Montaña",
    CIUDAD: "Ciudad",
    CALUROSO: "Caluroso",
    TEMPLADO: "Templado",
    FRIO: "Frío",
    DEPORTES_Y_AVENTURAS: "Deportes y Aventuras",
    CULTURA_Y_MUSEOS: "Cultura y Museos",
    RELAX_Y_BIENESTAR: "Relax y Bienestar",
    HOTEL_LUJO: "Hotel de lujo",
    HOSTAL_ALBERGUE: "Hostal/Albergue",
    AIRBNB: "Airbnb",
    MENOR_UNA_SEMANA: "Menos de una semana",
    UNA_Y_DOS_SEMANAS: "Entre una y dos semanas",
    MAYOR_DOS_SEMANAS: "Más de dos semanas",
    MENOR_QUE_TREINTA: "Menos de 30",
    TREINTA_Y_CINCUENTA: "Entre 30 y 50",
    MAYOR_QUE_CINCUENTA: "Más de 50",
  };

  const preguntas = [
    "¿Qué tipo de entorno prefieres para tus vacaciones?",
    "¿Qué clima prefieres durante tus vacaciones?",
    "¿Qué tipo de actividades prefieres hacer durante tus vacaciones?",
    "¿Qué tipo de alojamiento prefieres?",
    "¿Cuánto tiempo planeas quedarte de vacaciones?",
    "¿Cuál es tu rango de edad?",
  ];

  const opciones = [
    ["Playa", "Montaña", "Ciudad"],
    ["Caluroso", "Templado", "Frío"],
    ["Deportes y Aventuras", "Cultura y Museos", "Relax y Bienestar"],
    ["Hotel de lujo", "Hostal/Albergue", "Airbnb"],
    ["Menos de una semana", "Entre una y dos semanas", "Más de dos semanas"],
    ["Menos de 30", "Entre 30 y 50", "Más de 50"],
  ];

  const imagenes = [
    ["/imagenes/imagen1.jpg", "/imagenes/imagen2.jpg", "/imagenes/imagen3.jpg"],
    ["/imagenes/Tulum.jpg", "/imagenes/Templado.jpg", "/imagenes/Frio.jpg"],
    ["/imagenes/Aventura.jpg", "/imagenes/cultura.jpg", "/imagenes/relax.jpg"],
    ["/imagenes/hotelujo.jpg", "/imagenes/hostal.jpg", "/imagenes/airbnb.jpg"],
    [
      "/imagenes/findesemana.jpg",
      "/imagenes/dosemanas.jpg",
      "/imagenes/calendario.jpg",
    ],
    [
      "/imagenes/veinte.jpg",
      "/imagenes/treinta.jpg",
      "/imagenes/cincuenta.jpg",
    ],
  ];

  const datos = [
    [
      "¿Sabías que las playas no siempre son doradas? Hay playas con arena negra volcánica, rosa coralina y hasta verde olivo.",
      "Las montañas tienen su propio clima. Al subir una montaña, puedes experimentar diferentes climas en pocos kilómetros.",
      "Muchas ciudades tienen secretos subterráneos. Bajo las calles de muchas ciudades se encuentran redes de túneles, ríos subterráneos y hasta antiguas ruinas.",
    ],
    [
      "En muchos lugares con clima cálido se celebran festivales y eventos al aire libre, aprovechando las altas temperaturas.",
      "Muchas de las rutas turísticas más famosas del mundo se encuentran en regiones con clima templado.",
      "En lugares con clima frío, el turismo se concentra principalmente en los meses de invierno, cuando la nieve cubre el paisaje.",
    ],
    [
      "Desde las montañas de Nepal hasta los ríos de Costa Rica, existen numerosos destinos que ofrecen experiencias únicas para los amantes de la adrenalina.",
      "Al visitar los museos, los viajeros pueden imaginar cómo era la vida en la corte real y apreciar la arquitectura de una época pasada.",
      "Al visitar un baño termal, los viajeros pueden conectar con las tradiciones de culturas antiguas y experimentar una forma de relajación practicada durante siglos.",
    ],
    [
      "Algunos de los hoteles más lujosos del mundo ofrecen experiencias exclusivas que incluyen la posibilidad de tener un mayordomo.",
      "Muchos de los hostales y albergues más populares del mundo se encuentran ubicados en edificios históricos o con una arquitectura única.",
      "Airbnb nació de una necesidad de alojamiento económico durante un evento en San Francisco.",
    ],
    [
      "Estudios han demostrado que incluso viajes cortos pueden tener un impacto significativo en la reducción del estrés y la mejora del estado de ánimo.",
      "Este rango de tiempo permite sumergirte en la cultura local, conocer a fondo un lugar y crear recuerdos duraderos.",
      "Viajes prolongados te permiten desconectar completamente de tu rutina diaria y volver a casa sintiéndote renovado.",
    ],
    [
      "Viajar en la veintena te ayuda a desarrollar habilidades como la independencia, la adaptabilidad y la tolerancia a la incertidumbre.",
      "A menudo, se busca ir más allá de los destinos turísticos más populares y descubrir lugares menos conocidos.",
      "Muchos viajeros mayores se unen a grupos organizados para conocer a personas con intereses similares y compartir experiencias.",
    ],
  ];

  const getKey = (value: string): string => {
    const entries = Object.entries(PreferenciasLabels);
    const entry = entries.find(([, val]) => val === value);
    return entry ? entry[0] : "";
  };

  const verificarSeleccion = (opcion: string) => {
    if (opcion !== "") {
      const key = getKey(opcion);
      sessionStorage.setItem(`respuesta_${indice}`, key); // Guarda la respuesta seleccionada
      console.log("Habilitando botón 'Siguiente'");
      setDisSig(false); // Habilita el botón "Siguiente"
    }
    setDisAtras(indice === 0); // Deshabilita el botón "Atrás" si estamos en la primera pregunta
  };

  type DestinoService = {
    indice: number;
    setIndice: (indice: number) => void;
    respuestasSer: string[];
    PreferenciasLabels: typeof PreferenciasLabels;
  };

  const regresarPerfil = (destinoService: DestinoService) => {
    const confirmar = window.confirm(
      "¿Desea crear un nuevo perfil y restablecer las opciones seleccionadas?"
    );
    if (!confirmar) return;
    destinoService.indice = 0;
    setIndice(0);
    setRespuestasSer([]); //restablece las respuestas
    setOpcSelect("");
    navigate("/perfil");
  };

  const atras = () => {
    if (indice === 0) {
      setRespuestasSer(respuestasSer.slice(5, -1)); //elimina la última respuesta
      setIndice(indice - 1); //decrementa el indice
      setDisAtras(true); //deshabilita el botón atras
      setOpcSelect(""); //limpia la opción seleccionada
      return;
    }

    if (indice === preguntas.length - 1) {
      setHidSig(false); //oculta el botón siguiente al final
      setDisSig(true); //deshabilita el botón siguiente
    }

    setRespuestasSer(respuestasSer.slice(0, -1)); //elimina la última respuesta
    setIndice(indice - 1); //decrementa el indice
    setOpcSelect(""); //limpia la opción seleccionada
    setHidSig(false); //muestra el botón siguiente
    setCalcular(true); //oculta el botón calculadestino
  };

  const siguiente = () => {
    console.log("Respuestas antes de agregar:", respuestasSer);

    if (indice === preguntas.length - 1) {
      if (opcSelect) {
        setRespuestasSer((prevRespuestas) => {
          const nuevasRespuestas = [...prevRespuestas, opcSelect];
          console.log("Respuestas actualizadas (última):", nuevasRespuestas);
          return nuevasRespuestas;
        });
      } else {
        console.error("No se puede agregar una opción vacía.");
      }

      setHidSig(true); // Oculta el botón "Siguiente" al final
      setCalcular(false); // Muestra el botón "Calcular Destino"
      setDisAtras(false); // Habilita el botón "Atrás"
      setOpcSelect(""); // Limpia la opción seleccionada
      return;
    } else {
      setHidSig(false); // Muestra el botón "Siguiente"
    }

    // Actualiza el array de respuestas de forma segura
    setRespuestasSer((prevRespuestas) => {
      const nuevasRespuestas = [...prevRespuestas, opcSelect];
      console.log("Respuestas actualizadas:", nuevasRespuestas);
      return nuevasRespuestas;
    });

    setIndice(indice + 1); // Incrementa el índice
    setOpcSelect(""); // Limpia la opción seleccionada
    setDisSig(true); // Deshabilita el botón "Siguiente"
    setDisAtras(false); // Habilita el botón "Atrás"
  };

  const contadores = Array.from({ length: preguntas.length }, (_, idx) =>
    idx <= indice ? "active" : "inactive"
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-white  bg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold animate-fadeIn">
          {preguntas[indice]}
        </h1>
      </div>

      <div className="card-container">
        {opciones[indice].map((opcion, index) => (
          <label
            key={index}
            htmlFor={`opc${index + 1}`}
            className="cursor-pointer"
            aria-label={opcion}
          >
            <div className="relative group transform transition duration-300 hover:scale-105 w-80">
              <div className="bg-white text-black rounded-lg shadow-lg overflow-hidden">
                <img
                  src={imagenes[indice][index]}
                  alt={`imagen_${opcion}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{opcion}</h3>
                </div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white opacity-0 group-hover:opacity-100 transition duration-300 p-4 rounded-lg">
                <h3 className="text-xl font-semibold">¿Sabías qué...</h3>
                <p className="text-sm">{datos[indice][index]}</p>
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <input
                id={`opc${index + 1}`}
                type="radio"
                value={opcion}
                name="opciones"
                className="dots"
                checked={opcSelect === opcion}
                onChange={() => {
                  console.log("Opción seleccionada:", opcion);
                  setOpcSelect(opcion);
                  verificarSeleccion(opcion);
                }}
              />
            </div>
          </label>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <button
          className="px-6 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition"
          onClick={() => {
            const destinoService = {
              indice,
              setIndice,
              respuestasSer: respuestasSer,
              PreferenciasLabels,
            };
            regresarPerfil(destinoService);
          }}
        >
          Perfil
        </button>

        {contadores.map((contador, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded-lg transition ${
              idx === indice
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
            onClick={() => {
              setIndice(idx);
              setOpcSelect("");
            }}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <div className="mt-6 flex space-x-80">
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-400 transition disabled:opacity-50"
          type="button"
          onClick={atras}
          disabled={disAtras}
        >
          Atrás
        </button>
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-400 transition disabled:opacity-50"
          type="button"
          onClick={siguiente}
          disabled={disSig}
          hidden={hidSig}
        >
          Siguiente
        </button>
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-400 transition disabled:opacity-50"
          type="button"
          hidden={calcular}
          onClick={(e) => {
            e.preventDefault();
            if (respuestasSer.length === 0) {
              console.error("El array de respuestas está vacío.");
              return;
            }
            sessionStorage.setItem("respuestas", JSON.stringify(respuestasSer));
            console.log(
              "Respuestas finales guardadas en sessionStorage:",
              respuestasSer
            );
            navigate("/resultados");
          }}
        >
          Calcular Destino
        </button>
      </div>
    </main>
  );
}
