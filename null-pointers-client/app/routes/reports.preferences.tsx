import { useLoaderData } from "@remix-run/react";
import "~/styles/preferences.css";
import { preferencesLoader } from "../loaders/preferencesLoader";
import { Preferencia } from "../interfaces/preference";
import PreferencesTable from "../components/PreferencesTable";

/*logica para proteger vistas*/
import { useAuth } from "~/hooks/useAuth";
import { Navigate } from "@remix-run/react";

export const loader = preferencesLoader;

export default function Preferences() {
  const preferenciasData = useLoaderData<Preferencia[]>();

  if (!Array.isArray(preferenciasData) || preferenciasData.length === 0) {
    return <p className="no-data">No hay datos de preferencias disponibles.</p>;
  }

    /*logica para proteger vistas*/
    const { authorized, reason } = useAuth("Administrador");
    if (!authorized) {
      return <Navigate to="/" replace />;
    }

  return (
    <div className="container">
      <PreferencesTable preferenciasData={preferenciasData} />
    </div>
  );
}
