import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { loader } from "~/loaders/usersLoader";
import UsersTable from "../components/UsersTable";
import { useUserPreferences } from "../hooks/useUserPreferences";

interface User {
  nombre: string;
  email: string;
}

export { loader };

export default function Users() {
  const usuariosData = useLoaderData<typeof loader>() || [];
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    preferenciasUsuario,
    visibilidadPreferencias,
    loadPreferenciasUsuario,
    cargando,
  } = useUserPreferences();

  return (
    <>
      {isLoading ? (
        <div className="loading-indicator">Loading users...</div>
      ) : error ? (
        <div className="error-message">Error: {error}</div>
      ) : (
        <UsersTable
          usuariosData={usuariosData}
          preferenciasUsuario={preferenciasUsuario}
          visibilidadPreferencias={visibilidadPreferencias}
          loadPreferenciasUsuario={loadPreferenciasUsuario}
          cargando={cargando}
        />
      )}
    </>
  );
}
