import { Link } from "@remix-run/react";
import "~/styles/start.css";

export default function Start() {
  return (
    <div id="container" className="container">
      <Link to="/login">
        <img
          id="imagenInicio"
          src={"/assets/img/image1.png"}
          alt="Imagen de ejemplo"
          className="image"
        />

        {/* Contenido de texto (Información) */}
        <div id="texto" className="nosotros">
          <h1>Información</h1>
          <p>
            ¿Estás cansado de pasar horas buscando el destino perfecto para tu
            próximo viaje? ¿Te gustaría crear un viaje de acuerdo a tus
            preferencias y sin complicaciones? <br /> <br />
            <strong>¡Dale click a la imagen y prepárate para viajar!</strong>
          </p>
        </div>
      </Link>
    </div>
  );
}
