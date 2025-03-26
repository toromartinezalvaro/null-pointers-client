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
  const { authorized } = useAuth("Cliente");
  
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


  const enviarDestino = () => {
    // Recupera las respuestas desde sessionStorage
    const respuestasGuardadas = sessionStorage.getItem("respuestas");
    if (!respuestasGuardadas) {
      console.error("No se encontraron respuestas en sessionStorage.");
      return;
    }

    const respuestas = JSON.parse(respuestasGuardadas);
    console.log("Respuestas procesadas:", respuestas);

    let destinoA = "";
    let destinoE = "";
    
    const [pDestino, pClimatica, pActividad, pAlojamiento, dViaje, edad] =
      respuestas;

    switch (pDestino) {
      case "Playa":
        switch (pClimatica) {
          case "Caluroso":
            if (dViaje === "1-2 semanas") {
              if (
                edad === "Menos de 30 años" &&
                pActividad === "Deportes y Aventuras" &&
                pAlojamiento === "Hostal o Albergue"
              ) {
                destinoA = "Tulum";
                destinoE = "Ibiza";
              } else if (
                edad === "Menos de 30 años" &&
                pActividad === "Relax y Bienestar" &&
                pAlojamiento === "Hotel de Lujo"
              ) {
                destinoA = "Playa del Carmen";
                destinoE = "Santorini";
              } else if (
                edad === "30-50 años" &&
                pActividad === "Cultura y Museos" &&
                pAlojamiento === "Hotel de Lujo"
              ) {
                destinoA = "Honolulu";
                destinoE = "Malta";
              }
            }
            break;
          case "Templado":
            if (dViaje === "1-2 semanas") {
              if (
                edad === "Menos de 30 años" &&
                pActividad === "Cultura y Museos" &&
                pAlojamiento === "Hostal o Albergue"
              ) {
                destinoA = "San Juan";
                destinoE = "Niza";
              } else if (
                edad === "30-50 años" &&
                pActividad === "Cultura y Museos" &&
                pAlojamiento === "Hotel de Lujo"
              ) {
                destinoA = "Río de Janeiro";
                destinoE = "Lisboa";
              }
            }
            break;
        }
        break;
      case "Montaña":
        switch (pClimatica) {
          case "Frío":
            if (dViaje === "1-2 semanas") {
              if (edad === "Más de 50 años" && pAlojamiento === "Airbnb") {
                if (pActividad === "Cultura y Museos") {
                  destinoA = "Ushuaia";
                  destinoE = "Reykjavik";
                } else if (pActividad === "Relax y Bienestar") {
                  destinoA = "Aspen";
                  destinoE = "Innsbruck";
                }
              }
            }
            break;
          case "Templado":
            if (
              edad === "Más de 50 años" &&
              pAlojamiento === "Airbnb" &&
              pActividad === "Cultura y Museos" &&
              dViaje === "1-2 semanas"
            ) {
              destinoA = "Cusco";
              destinoE = "Granada";
            }
            break;
        }
        break;
      case "Ciudad":
        switch (pClimatica) {
          case "Caluroso":
            if (
              edad === "Más de 50 años" &&
              pAlojamiento === "Hotel de Lujo" &&
              pActividad === "Cultura y Museos" &&
              dViaje === "1-2 semanas"
            ) {
              destinoA = "Los Angeles";
              destinoE = "Roma";
            }
            break;
          case "Frío":
            if (
              edad === "30-50 años" &&
              pAlojamiento === "Hotel de Lujo" &&
              pActividad === "Cultura y Museos" &&
              dViaje === "1-2 semanas"
            ) {
              destinoA = "Toronto";
              destinoE = "Berlín";
            }
            break;
          case "Templado":
            if (dViaje === "1-2 semanas" && pActividad === "Cultura y Museos") {
              if (
                edad === "30-50 años" &&
                pAlojamiento === "Hostal o Albergue"
              ) {
                destinoA = "Ciudad de México";
                destinoE = "Madrid";
              } else if (
                edad === "Más de 50 años" &&
                pAlojamiento === "Hotel de Lujo"
              ) {
                destinoA = "Nueva York";
                destinoE = "París";
              }
            }
            break;
        }
        break;
    }

    if (destinoA === "") {
      destinoA = "Bora Bora";
      destinoE = "Dubái";
    }

    //Guardando los destinos en destinoService
    destinoService.destinoA = destinoA;
    destinoService.destinoE = destinoE;

    console.log(`Destino América: ${destinoA}, Destino Europa: ${destinoE}`);
    navigate("/destino"); //Redirige a la página destino
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
      <div className="container--resumen">
        <div className="resumen__preguntas">
          <div className="resumen__preguntas__item">Preferencia Destino:</div>
          <div className="resumen__preguntas__item">Preferencia Climática:</div>
          <div className="resumen__preguntas__item">Preferencia Actividad:</div>
          <div className="resumen__preguntas__item">Preferencia Alojamiento:</div>
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
        <div className="resumen__imagen">
          <i className="fa-solid fa-plane-up slide-in-bottom vibrate-1"></i>
        </div>
      </div>
      <div className="container__botones">
        <button type="button" onClick={volverAtras}>
          Atrás
        </button>
        <button type="button" onClick={enviarDestino}>
          Confirmar
        </button>
      </div>
    </main>
  );
}
