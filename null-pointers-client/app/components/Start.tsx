import { Link } from "@remix-run/react";
import "~/styles/start.css";

export default function Start() {
  return (
    <div className="start-container">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="title">Tu próximo destino te espera</h1>
        <p className="subtitle">
          Descubre experiencias únicas y personaliza tu viaje sin complicaciones.
        </p>

        <Link to="/login" className="cta-button">
          ¡Empieza tu aventura!
        </Link>
      </div>
    </div>
  );
}
