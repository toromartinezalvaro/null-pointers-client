import styles from "~/styles/resultados.css?url";
import { Form, useNavigate, Navigate } from "@remix-run/react";
import { useAuth } from "~/hooks/useAuth";
import { useEffect, useState } from "react";
import { destinoService } from "~/services/destinoService";

export const links = () => {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap",
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
      <main className="container">
        <h1>No se encontraron respuestas</h1>
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
    <main className="container">
      <h1 className="container__titulo">Tus preferencias:</h1>

      {/* Avión animado y trayectoria */}
      <div className="avion-animado">
        <i className="fas fa-paper-plane"></i>
        <div className="trayectoria"></div>
      </div>

      <div className="container--resumen">
        <div className="resumen__preguntas">
          <div className="resumen__preguntas__item">Preferencia Destino:</div>
          <div className="resumen__preguntas__item">Preferencia Climática:</div>
          <div className="resumen__preguntas__item">Preferencia Actividad:</div>
          <div className="resumen__preguntas__item">
            Preferencia Alojamiento:
          </div>
          <div className="resumen__preguntas__item">Duración viaje:</div>
          <div className="resumen__preguntas__item">Edad:</div>
        </div>

        <Form method="post" className="resumen__respuestas">
          {respuestas.map((respuesta, index) => (
            <div key={index} className="resumen__respuestas__item">
              <input type="text" readOnly value={respuesta} />
            </div>
          ))}
        </Form>
      </div>

      {/* Elementos flotantes decorativos */}
      <div className="elementos-flotantes">
        <div className="elemento-flotante uno"></div>
        <div className="elemento-flotante dos"></div>
        <div className="elemento-flotante tres"></div>
      </div>

      <div className="container__botones">
        <button type="button" onClick={volverAtras}>
          <i className="fa-solid fa-arrow-left"></i> Atrás
        </button>
        <button
          type="button"
          onClick={enviarDestino}
          className="boton-confirmar"
        >
          <i className="fa-solid fa-paper-plane"></i> Confirmar
        </button>
      </div>
    </main>
  );
}
