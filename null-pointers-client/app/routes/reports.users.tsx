import { useLoaderData } from "@remix-run/react";
import { usersLoader } from "../loaders/usersLoader";
import UsersTable from "../components/UsersTable";
import { useUserPreferences } from "../hooks/useUserPreferences"; // Importamos el custom hook

export const loader = usersLoader;

export default function Users() {
  const usuariosData = useLoaderData<{ nombre: string; email: string }[]>();
  const { preferenciasUsuario, visibilidadPreferencias, loadPreferenciasUsuario } = useUserPreferences();

  console.log({
    usuariosData,
    preferenciasUsuario,
    visibilidadPreferencias,
  });

  return (
    <UsersTable
      usuariosData={usuariosData}
      preferenciasUsuario={preferenciasUsuario}
      visibilidadPreferencias={visibilidadPreferencias}
      loadPreferenciasUsuario={loadPreferenciasUsuario}
    />
  );
}
