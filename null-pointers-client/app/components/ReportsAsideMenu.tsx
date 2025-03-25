import { NavLink } from "@remix-run/react";

const ReportsAsideMenu = () => {
  return (
    <aside className="sidebar">
      <h2>Reports</h2>
      <nav>
        <ul className="reports-menu">
          <li>
            <NavLink
              to="destinations"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Destinos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="users"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Usuarios
            </NavLink>
          </li>
          <li>
            <NavLink
              to="preferences"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Preferencias
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default ReportsAsideMenu;
