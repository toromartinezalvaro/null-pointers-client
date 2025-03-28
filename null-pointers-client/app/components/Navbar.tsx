import {
  navbarClasses,
  logoContainerClasses,
  logoClasses,
  navContainerClasses,
  navListClasses,
  navItemClasses,
  mobileNavClasses,
} from "~/styles/navbarStyles";

export default function Navbar() {
  return (
    <header>
      <nav className={`${navbarClasses} sm:${mobileNavClasses}`}>
        <a className={logoContainerClasses} href="/">
          <img
            className={logoClasses}
            src="/imagenes/amadeus-logo-dark-sky.png"
            alt="logo"
          />
        </a>
        <div className={navContainerClasses}>
          <ul className={navListClasses}>
            <li>
              <a className={navItemClasses} href="/">Inicio</a>
            </li>
            <li>
              <a
                className={navItemClasses}
                href="https://amadeus.com/es/contacto"
                target="_blank"
                rel="noreferrer"
              >
                Contacto
              </a>
            </li>
            <li>
              <a className={navItemClasses} href="/reports/destinations">Reporte</a>
            </li>
            <li>
              <a
                className={navItemClasses}
                href="https://amadeus.com/en"
                target="_blank"
                rel="noreferrer"
              >
                Amadeus
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
