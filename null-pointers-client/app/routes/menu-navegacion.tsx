import "~/styles/menu-navegacion.css";

export default function MenuNavegacion() {
  return (
    <header>
      <nav className="nav">
        <img
          className="nav__logo"
          src="/imagenes/amadeus-logo-dark-sky.png"
          alt="logo"
        />
        <div className="nav__container">
          <ul className="nav__lista">
            <li>
              <a href="../index">Inicio</a>
            </li>
            <li>
              <a href="https://amadeus.com/es/contacto" target="_blank" rel="noreferrer">
                Contacto
              </a>
            </li>
            <li>
              <a href="/reports/preferences">
                Reporte
              </a>
            </li>
            <li>
              <a href="https://amadeus.com/en" target="_blank" rel="noreferrer">
                Amadeus
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
