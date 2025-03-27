import Plans from "../components/Plans";
import { useLoaderData } from "@remix-run/react";
import { loader as plansLoader } from "~/loaders/plansLoader";
import styles from "~/styles/plans.css?url";

export const loader = plansLoader;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function PlansRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const { destino, srcA } = loaderData?.data || {};

  // Verificar si los datos existen antes de renderizar el componente o si tienen valores predeterminados
  if (!destino || !srcA || srcA.includes("path/to/")) {
    return (
      <div className="container">
        No se encontraron datos del destino o la imagen no está disponible
      </div>
    );
  }

  console.log("Datos del loader:", { destino, srcA });
  return <Plans destino={destino} srcA={srcA} />;
}
