import { Link } from "@remix-run/react";
import { PlansProps } from "../interfaces/plans";

export default function Plans({ destino, srcA }: PlansProps) {
  return (
    <div className="container">
      <div className="conteiner__encabezado">
        <div className="opcion__link__item">
          <Link to="/destino">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <span className="tooltiptext">Volver a tus destinos</span>
        </div>

        <h1 className="conteiner__encabezado__titulo">Destino seleccionado:</h1>
        <div className="conteiner__encabezado__imagen">
          <img src={srcA} alt="Imagen del destino" />
        </div>
        <h2 className="conteiner__encabezado__nombre">{destino}</h2>
      </div>

      <div className="container__hospedaje">
        <h2>Tus opciones de hospedaje:</h2>
        <div>
          <p>
            Estas son las opciones de hospedaje que te recomendamos según tus
            preferencias:
          </p>
        </div>

        <div className="container__hospedaje__opciones">
          <div className="container__hospedaje__opcion">
            <div className="container__hospedaje__opcion__img">
              <a
                href="https://www.palladiumhotelgroup.com/es/hoteles/mexico/costamujerescancun/trs-coral-hotel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/imagenes/trs-cancun.jpg" alt="TRS Coral Hotel" />
              </a>
            </div>
            <div className="container__hospedaje__opcion__info">
              <h3>TRS Coral Hotel</h3>
              <p>
                Se sitúa en Cancún, playa del Carmen, cuenta con zona privada de
                playa, piscina al aire libre, wifi gratis en todo el hotel y 13
                restaurantes con diferentes menús.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container__vuelos">
        <h2>Tus opciones de vuelos:</h2>
        <div className="vuelo-container">
          <p className="txt-parrafo">
            Estos son las dos opciones de vuelos que te recomendamos según tus
            preferencias:
          </p>
        </div>

        <div className="container__vuelos__opciones">
          <div className="container__vuelos__opcion">
            <div className="container__hospedaje__opcion__img">
              <a
                href="https://www.avianca.com/es/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/imagenes/avion-avianca.jpg" alt="Avianca" />
              </a>
            </div>
            <div className="container__hospedaje__opcion__info">
              <h3>Avianca</h3>
              <p className="txt-parrafo">
                Avianca, una aerolínea Colombiana de categoría premium, con más
                de 104 años de trayectoria, volando a más de 104 destinos, con
                &quot;Avianca el cielo es de todos&quot;.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
