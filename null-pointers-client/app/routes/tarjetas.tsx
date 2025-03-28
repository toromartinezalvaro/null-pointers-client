import type { LoaderFunction } from "@remix-run/node";
import { json} from "@remix-run/react";
import styles from "~/styles/tarjetas.css?url";
import useDestinoService from "~/hooks/useTarjetasLogic"; // Importamos el hook
import { useAuth } from "~/hooks/useAuth";


export const links = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async () => {
  return json({ Tarjetas: "Tarjetas" });
};

export default function Tarjetas() {
  const { authorized } = useAuth(["CLIENT", "ADMIN"]);

  const {
    indice,
    setIndice,
    respuestasSer,
    opcSelect,
    setOpcSelect,
    disSig,
    disAtras,
    hidSig,
    calcular,
    PreferenciasLabels,
    preguntas,
    opciones,
    imagenes,
    datos,
    verificarSeleccion,
    regresarPerfil,
    atras,
    siguiente,
    contadores,
    navigate,
  } = useDestinoService();

  if (!authorized) {
    navigate("login");
  }

  return (
    <main className="flex flex-col items-center justify-center text-white  fondo">
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
            navigate("/resultados");
          }}
        >
          Calcular Destino
        </button>
      </div>
    </main>
  );
}
