import styles from "../styles/plans.css";
import Plans from "../components/Plans";
import { useLoaderData, Navigate } from "@remix-run/react";
import { useAuth } from "~/hooks/useAuth";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function PlansRoute() {
  const { destino, srcA } = useLoaderData<{ destino: string; srcA: string }>();

  const { authorized } = useAuth(["CLIENT", "ADMIN"]);

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }
  console.log("Datos del loader:",{destino, srcA});
  return <Plans destino={destino} srcA={srcA} />;
}
