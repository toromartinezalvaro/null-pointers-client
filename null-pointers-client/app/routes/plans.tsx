import styles from "../styles/plans.css";
import Plans from "../components/Plans";
import { useLoaderData } from "@remix-run/react";


// Importa los estilos
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

// Ruta principal que pasa los datos al componente
export default function PlansRoute() {
  const { destino, srcA } = useLoaderData<{ destino: string; srcA: string }>();
  console.log("Datos del loader:",{destino, srcA});
  return <Plans destino={destino} srcA={srcA} />;
}
