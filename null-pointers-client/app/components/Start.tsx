import { Link } from "@remix-run/react";
import "~/styles/start.css";
interface StartProps{
  imageSrc: string; // Propiedad requerida para recibir la imagen
}

export default function Start({ imageSrc }: StartProps) {
  return (
    <div id="container">
    <Link to="/record">
    <img id="imagenInicio" src={imageSrc} alt="Imagen de ejemplo" className="image" />
    </Link>
   {/* Contenido de texto (Información) */}
   <div id="texto" className="nosotros">
        <h1>Información</h1>
        <p>
          ¿Estás cansado de pasar horas buscando el destino perfecto para tu próximo viaje?
          ¿Te gustaría crear un viaje de acuerdo a tus preferencias y sin complicaciones? <br /> <br />
          <strong>¡Dale click a la imagen y prepárate para viajar!</strong>
        </p>
      </div>
  </div>
  

  
  );
}
