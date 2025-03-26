import { useEffect, useState } from "react";
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
  const { authorized } = useAuth(["ADMIN"]);
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!authorized) {
      navigate("/login", { replace: true });
    }
  }, [authorized, navigate]);

  if (!isClient) {
    return null;
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
