import { Outlet, Navigate } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import reportsStylesHref from "~/styles/reports.css?url";
import ReportsAsideMenu from "~/components/ReportsAsideMenu";

/*logica para proteger vistas*/
import { useAuth } from "~/hooks/useAuth";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: reportsStylesHref },
];

export default function ReportsLayout() {

  /*logica para proteger vistas*/
  const { authorized } = useAuth("Administrador");

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="reports-container">
      <ReportsAsideMenu />

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
