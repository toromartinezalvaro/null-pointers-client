import { Outlet, NavLink } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import styles from "../styles/reports.css";

// Load CSS styles in Remix
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export default function ReportsLayout() {
  return (
    <div className="reports-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Reports</h2>
        <nav>
          <ul>
            <li>
              <NavLink to="destinations" className={({ isActive }) => (isActive ? "active" : "")}>
                Destinations
              </NavLink>
            </li>
            <li>
              <NavLink to="users" className={({ isActive }) => (isActive ? "active" : "")}>
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to="preferences" className={({ isActive }) => (isActive ? "active" : "")}>
                Preferences
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Dynamic content from subroutes */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}








// import { Outlet, NavLink } from "@remix-run/react";
// import type { LinksFunction } from "@remix-run/node";
// import styles from "../styles/reports.css";

// // Función para cargar el archivo CSS en Remix
// export const links: LinksFunction = () => [
//   { rel: "stylesheet", href: styles },
// ];

// export default function ReportsLayout() {
//   return (
//     <div className="reports-container">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <h2>Reports</h2>
//         <nav>
//           <ul>
//             <li><NavLink to="destinations" className={({ isActive }) => isActive ? "active" : ""}>Destinations</NavLink></li>
//             <li><NavLink to="users" className={({ isActive }) => isActive ? "active" : ""}>Users</NavLink></li>
//             <li><NavLink to="preferences" className={({ isActive }) => isActive ? "active" : ""}>Preferences</NavLink></li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Contenido dinámico de las subrutas */}
//       <main className="content">
//         <Outlet />
//       </main>
//     </div>
//   );
// }
