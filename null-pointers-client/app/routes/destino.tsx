import { useNavigate } from "@remix-run/react";
import styles from "~/styles/destino.css?url";
import { useAuth } from "~/hooks/useAuth";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

interface Destino {
  id: number;
  comidaTipica: string;
  createdAt: string;
  idioma: string;
  imgUrl: string;
  lugarImperdible: string;
  nombre: string;
  pais: string;
  continentesId: number;
}

export default function Destino() {
  const navigate = useNavigate();
  const { authorized } = useAuth(["CLIENT", "ADMIN"]);

  if (!authorized) {
    navigate("login");
    return null;
  }

  const storedDestinos = sessionStorage.getItem("destinos");
  const destinos: Destino[] = storedDestinos ? JSON.parse(storedDestinos) : [];

  const destinoUno = destinos[0];
  const destinoDos = destinos[1];

  return (
    <main className="container">
      <div className="volver-container">
        <button className="volver-boton" onClick={() => navigate("/resultados")}>
          Volver a Resultados
        </button>
      </div>
      <h1 className="container__titulo">Tus Destinos:</h1>

      <div className="container--opciones">
        {[
          { destino: destinoUno, titulo: "Aventura en América", id: "America" },
          { destino: destinoDos, titulo: "Aventura en Europa", id: "Europa" },
        ].map(({ destino, titulo, id }) => (
          <section key={id} className="opciones--opcion">
            <div className="opcion__encabezado">
              <button className="opcion__encabezado__nombre">{titulo}</button>
            </div>

            <div className="opcion__destino">
              <input
                value={destino?.nombre || ""}
                className="opcion__encabezado__destino focus-in-expand"
                type="text"
                readOnly
                id={`destino${id}`}
              />
            </div>

            <div className="opcion__imagen">
              <img src={destino?.imgUrl || "/imagenes/default.png"} alt={`Destino en ${id}`} />
              <div className="overlay">
                <div className="text">
                  <p>País:</p> <input className="text__input" type="text" value={destino?.pais || ""} readOnly />
                  <p>Idioma:</p> <input className="text__input" type="text" value={destino?.idioma || ""} readOnly />
                  <p>Lugar Imperdible:</p> <input className="text__input" type="text" value={destino?.lugarImperdible || ""} readOnly />
                  <p>Comida típica:</p> <input className="text__input" type="text" value={destino?.comidaTipica || ""} readOnly />
                </div>
              </div>
            </div>

            <div className="opcion__link__item">
              <button onClick={() => navigate("/plans")}>
                <img src="/imagenes/paquete.png" alt="Explora tus opciones" />
              </button>
              <span className="tooltiptext">Explora tus opciones</span>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}