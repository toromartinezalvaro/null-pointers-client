import styles from "../styles/plans.css";
import Plans from "../components/Plans";
import { useLoaderData } from "@remix-run/react";

/*logica para proteger vistas*/
import { useAuth } from "~/hooks/useAuth";
import { Navigate } from "@remix-run/react";

// Importa los estilos
export function links() {

   /*logica para proteger vistas*/
   const { authorized, reason } = useAuth("Cliente");

   if (!authorized) {
     return <Navigate to="/login" replace />;
   }

  return [{ rel: "stylesheet", href: styles }];
}

// Ruta principal que pasa los datos al componente
export default function PlansRoute() {
  const { destino, srcA } = useLoaderData<{ destino: string; srcA: string }>();
  console.log("Datos del loader:",{destino, srcA});
  return <Plans destino={destino} srcA={srcA} />;
}
