import "~/styles/users.css";

interface Destination {
  nombre: string;
  nombre_continente: string;
}

interface User {
  nombre: string;
  email: string;
}

interface UsersTableProps {
  usuariosData: User[];
  preferenciasUsuario: { [email: string]: Destination[] };
  visibilidadPreferencias: { [email: string]: boolean };
  loadPreferenciasUsuario: (email: string) => void;
  cargando: { [email: string]: boolean };
}

export default function UsersTable({
  usuariosData,
  preferenciasUsuario,
  visibilidadPreferencias,
  loadPreferenciasUsuario,
  cargando,
}: UsersTableProps) {

  if (!usuariosData || usuariosData.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="w-1/4">Nombre</th>
            <th className="w-1/4">Email</th>
            <th className="w-1/2">Destinos Recomendados</th>
          </tr>
        </thead>
        <tbody>
          {usuariosData.map((usuario) => (
            <tr key={usuario.email}>
              <td className="table-cell w-1/4">{usuario.nombre}</td>
              <td className="table-cell w-1/4">{usuario.email}</td>
              <td className="table-cell w-1/2">
                {!visibilidadPreferencias[usuario.email] ? (
                  <button
                    onClick={() => loadPreferenciasUsuario(usuario.email)}
                    className="button button-view"
                    disabled={cargando[usuario.email]}
                  >
                    {cargando[usuario.email] ? "Cargando..." : "Ver Destinos"}
                  </button>
                ) : (
                  <div className="destinations-container">
                    <button
                      onClick={() => loadPreferenciasUsuario(usuario.email)}
                      className="button button-hide"
                    >
                      Ocultar Destinos
                    </button>
                    <ul className="destinations-list">
                      {preferenciasUsuario[usuario.email]?.map(
                        (destino, index) => (
                          <li key={index} className="destination-item">
                            {destino.nombre}{" "}
                            {destino.nombre_continente
                              ? `(${destino.nombre_continente})`
                              : ""}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
