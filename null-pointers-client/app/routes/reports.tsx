import { Outlet } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import reportsStylesHref from "~/styles/reports.css?url";
import ReportsAsideMenu from "~/components/ReportsAsideMenu";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: reportsStylesHref },
];

export default function ReportsLayout() {
  return (
    <div className="reports-container">
      <ReportsAsideMenu />

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
