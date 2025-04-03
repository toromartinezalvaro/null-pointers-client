import { Form, useNavigate, Navigate } from "@remix-run/react";
import { useAuth } from "~/hooks/useAuth";
import { useEffect, useState } from "react";
import { destinoService } from "~/services/destinoService";

export const links = () => {
  return [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap",
      rel: "stylesheet",
    },
    {
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
      rel: "stylesheet",
    },
  ];
};

export default function Resultados() {
  useEffect(() => {
    const respuestasGuardadas = sessionStorage.getItem("respuestas");
    if (respuestasGuardadas) {
      setRespuestas(JSON.parse(respuestasGuardadas));
    } else {
      console.error("No se encontraron respuestas en sessionStorage.");
    }
  }, []);

  const [respuestas, setRespuestas] = useState<string[]>([]);
  const navigate = useNavigate();
  const { authorized } = useAuth(["CLIENT", "ADMIN"]);

  if (!respuestas || respuestas.length === 0) {
    return (
      <main className="h-[94vh] w-full bg-indigo-950 flex flex-col items-center justify-center">
        <h1 className="text-white text-2xl font-semibold">No se encontraron respuestas</h1>
      </main>
    );
  }

  /*logica para proteger vistas*/
  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  const enviarDestino = async () => {
    try {
      const userAuthData = sessionStorage.getItem("userAuthData");
      const parsedData = userAuthData ? JSON.parse(userAuthData) : null;
      const email = parsedData?.email || "";

      const body = {
        email: email,
        entorno: sessionStorage.getItem("respuesta_0") || "",
        clima: sessionStorage.getItem("respuesta_1") || "",
        actividad: sessionStorage.getItem("respuesta_2") || "",
        alojamiento: sessionStorage.getItem("respuesta_3") || "",
        tiempo_viaje: sessionStorage.getItem("respuesta_4") || "",
        rango_edad: sessionStorage.getItem("respuesta_5") || "",
      };

      const response = await fetch("http://localhost:5220/api/PreferenciaUsuarios/asignar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
      }

      // Verifica si la respuesta tiene contenido antes de parsearla
      const text = await response.text();
      if (!text) {
        console.warn("La API devolvió una respuesta vacía");
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error("La respuesta de la API no es un JSON válido:", text);
        throw new Error("La respuesta de la API no es un JSON válido");
      }

      if (data) {
        sessionStorage.setItem("destinos", JSON.stringify(data));
      }

      destinoService.destinoA = data[0];
      destinoService.destinoE = data[1];

      navigate("/destino");
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const volverAtras = () => {
    if (respuestas.length > 0) {
      const nuevasRespuestas = [...respuestas];
      nuevasRespuestas.pop(); // Elimina la última respuesta
      sessionStorage.setItem("respuestas", JSON.stringify(nuevasRespuestas));
      setRespuestas(nuevasRespuestas); // Actualiza el estado local
    }
    navigate("/tarjetas"); // Redirige a la página de tarjetas
  };

  return (
    <main className="h-[94vh] w-full bg-gradient-to-b from-indigo-950 to-indigo-900 flex flex-col relative overflow-hidden">
      {/* Título con animación */}
      <h1 className="h-[15vh] flex justify-center items-center text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide font-montserrat transition-transform duration-300 hover:scale-105 drop-shadow-lg my-4 px-4 text-center">
        Tus preferencias:
      </h1>

      {/* Avión animado con trayectoria */}
      <div className="absolute top-[10%] right-[5%] sm:right-[8%] md:right-[10%] z-10 animate-pulse hidden sm:block">
        <i className="fas fa-paper-plane text-3xl md:text-4xl text-blue-400"></i>
        <div className="absolute top-1/2 right-0 w-20 h-0.5 border-t-2 border-dashed border-blue-400/30 transform -translate-y-1/2"></div>
      </div>

      {/* Contenedor principal de resumen */}
      <div className="flex flex-col h-[70vh] px-2 sm:px-4 md:px-8 lg:px-12 w-full max-w-6xl mx-auto overflow-y-auto">
        <Form method="post" className="flex flex-col justify-evenly">
          {/* En móvil cada pregunta seguida de su respuesta */}
          {respuestas.map((respuesta, index) => (
            <div key={index} className="flex flex-col sm:flex-row mb-4 sm:mb-6">
              {/* Título de la pregunta */}
              <div className="py-3 px-4 md:py-4 md:px-6 lg:py-5 lg:px-8 font-semibold bg-blue-100 text-indigo-950 
                rounded-t-lg sm:rounded-t-none sm:rounded-l-lg shadow-md text-sm md:text-base lg:text-lg 
                mb-0 w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-indigo-200">
                {index === 0 && "Preferencia Destino:"}
                {index === 1 && "Preferencia Climática:"}
                {index === 2 && "Preferencia Actividad:"}
                {index === 3 && "Preferencia Alojamiento:"}
                {index === 4 && "Duración viaje:"}
                {index === 5 && "Edad:"}
              </div>
              {/* Respuesta */}
              <div className="py-3 px-4 md:py-4 md:px-6 lg:py-5 lg:px-8 bg-indigo-800 text-white 
                rounded-b-lg sm:rounded-b-none sm:rounded-r-lg shadow-md w-full sm:w-1/2">
                <input
                  type="text"
                  readOnly
                  value={respuesta}
                  className="bg-transparent border-none text-white placeholder-white outline-none w-full text-sm md:text-base lg:text-lg"
                  aria-label={`Respuesta ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </Form>
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-300/20 rounded-full animate-bounce-slow hidden sm:block"></div>
        <div className="absolute top-[45%] right-[15%] w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 bg-indigo-400/20 rounded-full animate-float-slow hidden sm:block"></div>
        <div className="absolute bottom-[20%] left-[20%] w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-purple-300/20 rounded-full animate-pulse hidden sm:block"></div>
      </div>

      {/* Botones de navegación */}
      <div className="mt-auto flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 py-6 sm:py-4 px-4">
        <button
          type="button"
          onClick={volverAtras}
          className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 bg-indigo-800 hover:bg-indigo-700 text-blue-100 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-x-1 text-sm md:text-base lg:text-lg"
        >
          <i className="fa-solid fa-arrow-left"></i> Atrás
        </button>
        <button
          type="button"
          onClick={enviarDestino}
          className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:translate-x-1 text-sm md:text-base lg:text-lg"
        >
          <i className="fa-solid fa-paper-plane"></i> Confirmar
        </button>
      </div>
    </main>
  );
}
