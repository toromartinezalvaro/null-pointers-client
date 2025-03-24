import styles from "../styles/resultados.css";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { json } from "@remix-run/node";
import { destinoService } from "../services/destinoService";

/*logica para proteger vistas*/
import { useAuth } from "~/hooks/useAuth";
import { Navigate } from "@remix-run/react";

export const links = () => {

   /*logica para proteger vistas*/
   const { authorized, reason } = useAuth("Cliente");

   if (!authorized) {
     return <Navigate to="/login" replace />;
   }

  return [{ rel: "stylesheet", href: styles },
    {
      rel: "preconnect", href: "https://fonts.googleapis.com"
  },
  {
      href: "https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap", rel: "stylesheet"
  }
  ];
};

export const loader = async () => {
  return json({
    respuestas: destinoService.respuestasSer,
  });
  
  
};

export default function Resultados() {
  const { respuestas } = useLoaderData<{ respuestas: string[] }>();
  
  const navigate = useNavigate();

  const enviarDestino = () => {
    let destinoA = "";
    let destinoE = "";
    const [pDestino, pClimatica, pActividad, pAlojamiento, dViaje, edad] = respuestas;

    switch (pDestino) {
      case "Playa":
        switch (pClimatica) {
          case "Caluroso":
            if (dViaje === "1-2 semanas") {
              if (edad === "Menos de 30 años" && pActividad === "Deportes y Aventuras" && pAlojamiento === "Hostal o Albergue") {
                destinoA = "Tulum";
                destinoE = "Ibiza";
              } else if (edad === "Menos de 30 años" && pActividad === "Relax y Bienestar" && pAlojamiento === "Hotel de Lujo") {
                destinoA = "Playa del Carmen";
                destinoE = "Santorini";
              } else if (edad === "30-50 años" && pActividad === "Cultura y Museos" && pAlojamiento === "Hotel de Lujo") {
                destinoA = "Honolulu";
                destinoE = "Malta";
              }
            }
            break;
          case "Templado":
            if (dViaje === "1-2 semanas") {
              if (edad === "Menos de 30 años" && pActividad === "Cultura y Museos" && pAlojamiento === "Hostal o Albergue") {
                destinoA = "San Juan";
                destinoE = "Niza";
              } else if (edad === "30-50 años" && pActividad === "Cultura y Museos" && pAlojamiento === "Hotel de Lujo") {
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
            if (edad === "Más de 50 años" && pAlojamiento === "Airbnb" && pActividad === "Cultura y Museos" && dViaje === "1-2 semanas") {
              destinoA = "Cusco";
              destinoE = "Granada";
            }
            break;
        }
        break;
      case "Ciudad":
        switch (pClimatica) {
          case "Caluroso":
            if (edad === "Más de 50 años" && pAlojamiento === "Hotel de Lujo" && pActividad === "Cultura y Museos" && dViaje === "1-2 semanas") {
              destinoA = "Los Angeles";
              destinoE = "Roma";
            }
            break;
          case "Frío":
            if (edad === "30-50 años" && pAlojamiento === "Hotel de Lujo" && pActividad === "Cultura y Museos" && dViaje === "1-2 semanas") {
              destinoA = "Toronto";
              destinoE = "Berlín";
            }
            break;
          case "Templado":
            if (dViaje === "1-2 semanas" && pActividad === "Cultura y Museos") {
              if (edad === "30-50 años" && pAlojamiento === "Hostal o Albergue") {
                destinoA = "Ciudad de México";
                destinoE = "Madrid";
              } else if (edad === "Más de 50 años" && pAlojamiento === "Hotel de Lujo") {
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

    destinoService.destinoA = destinoA;
    destinoService.destinoE = destinoE;
    console.log(`Destino América: ${destinoA}, Destino Europa: ${destinoE}`);
    navigate("/destino");//Redirige a la página destino
  };

  const volverAtras = () => {
    destinoService.indice = 5;
    destinoService.respuestasSer.pop();
    navigate ("/preguntas");//Redirige a la página preguntas
    window.history.back(); 
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
          <div className="resumen__respuestas__item">
            <input type="text" name="pDestino" readOnly id="entorno" value={respuestas[0]} />
          </div>
          <div className="resumen__respuestas__item">
            <input type="text" name="pClimatica" readOnly id="clima" value={respuestas[1]} />
          </div>
          <div className="resumen__respuestas__item">
            <input type="text" name="pActividad" readOnly id="actividades" value={respuestas[2]} />
          </div>
          <div className="resumen__respuestas__item">
            <input type="text" name="pAlojamiento" readOnly id="alojamiento" value={respuestas[3]} />
          </div>
          <div className="resumen__respuestas__item">
            <input type="text" name="dViaje" readOnly id="tiempo" value={respuestas[4]} />
          </div>
          <div className="resumen__respuestas__item">
            <input type="text" name="edad" readOnly id="edad" value={respuestas[5]} />
          </div>
        </Form>
        <div className="resumen__imagen">
          <i className="fa-solid fa-plane-up slide-in-bottom vibrate-1"></i>
        </div>
      </div>
      <div className="container__botones">
        <button type="button" onClick={volverAtras}>Atras</button>
        <button type="button" onClick={enviarDestino}>Confirmar</button>
      </div>
    </main>
  );
}


