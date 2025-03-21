import type { LinksFunction } from "@remix-run/node";
import {
  // Form,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";


import appStylesHref from "./app.css?url";
import { DestinoProvider } from "./context/destinoService";
import MenuNavegacion from "./routes/menu-navegacion";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" }, // Fuente Roboto
  { rel: "stylesheet", href: "/styles/extra.css" } // Archivo de estilos adicional
  ,{
    rel: "preconnect", href: "https://fonts.googleapis.com"
},
{
    href: "https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap", rel: "stylesheet"}
];



export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <DestinoProvider>
        
        <header>
          <MenuNavegacion/> {/* Encabezado común */}
        </header>
        <div id="detail">
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        </DestinoProvider>
      </body>
    </html>
  );
}
