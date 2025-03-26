import { useLoaderData, Navigate } from "@remix-run/react";
import { usersLoader } from "../loaders/usersLoader";
import UsersTable from "../components/UsersTable";
import { useUserPreferences } from "../hooks/useUserPreferences"; // Importamos el custom hook

/* Lógica para proteger vistas */
import { useAuth } from "~/hooks/useAuth";

export const loader = usersLoader;

interface User {
  nombre: string;
  email: string;
}

export default function Users() {
  const usuariosData = useLoaderData<User[]>();

  const {
    preferenciasUsuario,
    visibilidadPreferencias,
    loadPreferenciasUsuario,
    cargando, // <-- Agregamos cargando
  } = useUserPreferences();

  /* Lógica para proteger vistas */
  const { authorized } = useAuth(["ADMIN"]);

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return (
    <UsersTable
      usuariosData={usuariosData}
      preferenciasUsuario={preferenciasUsuario}
      visibilidadPreferencias={visibilidadPreferencias}
      loadPreferenciasUsuario={loadPreferenciasUsuario}
      cargando={cargando} // <-- Ahora lo pasamos a UsersTable
    />
  );
}





// import { useLoaderData, Navigate } from "@remix-run/react";
// import { usersLoader } from "../loaders/usersLoader";
// import UsersTable from "../components/UsersTable";
// import { useUserPreferences } from "../hooks/useUserPreferences"; // Importamos el custom hook

// /*logica para proteger vistas*/
// import { useAuth } from "~/hooks/useAuth";

// export const loader = usersLoader;

// export default function Users() {
//   const usuariosData = useLoaderData<{ nombre: string; email: string }[]>();
//   const { preferenciasUsuario, visibilidadPreferencias, loadPreferenciasUsuario } = useUserPreferences();

//   /*logica para proteger vistas*/
//   const { authorized } = useAuth("Administrador");

//   if (!authorized) {
//     return <Navigate to="/login" replace />;
//   }
//   return (
//     <UsersTable
//       usuariosData={usuariosData}
//       preferenciasUsuario={preferenciasUsuario}
//       visibilidadPreferencias={visibilidadPreferencias}
//       loadPreferenciasUsuario={loadPreferenciasUsuario}
//     />
//   );
// }
