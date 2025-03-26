import { Outlet, useNavigate } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import reportsStylesHref from "~/styles/reports.css?url";
import ReportsAsideMenu from "~/components/ReportsAsideMenu";

/* Lógica para proteger vistas */
import { useAuth } from "~/hooks/useAuth";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: reportsStylesHref },
];

export default function ReportsLayout() {
  const navigate = useNavigate();
  const { authorized } = useAuth(["ADMIN"]);

  if (!authorized) {
    // return <Navigate to="/login" replace />;
    navigate("/login");
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
