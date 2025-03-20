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
}

export default function UsersTable({
  usuariosData,
  preferenciasUsuario,
  visibilidadPreferencias,
  loadPreferenciasUsuario,
}: UsersTableProps) {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md overflow-auto max-h-screen no-scrollbar">
      <table className="min-w-full bg-white text-center">
        <thead className="sticky m-0 top-0 h-16 bg-white">
          <tr className="bg-gray-800 text-white">
            <th className="py-2 px-4 border-b w-1/4">Nombre</th>
            <th className="py-2 px-4 border-b w-1/4">Email</th>
            <th className="py-2 px-4 border-b w-1/2">Destinos Recomendados</th>
          </tr>
        </thead>
        <tbody>
          {usuariosData.map((usuario) => (
            <tr key={usuario.email}>
              <td className="py-2 px-4 border-b h-20 w-1/4">{usuario.nombre}</td>
              <td className="py-2 px-4 border-b h-20 w-1/4">{usuario.email}</td>
              <td className="py-2 px-4 border-b h-20 w-1/2">
                {!visibilidadPreferencias[usuario.email] ? (
                  <button
                    onClick={() => loadPreferenciasUsuario(usuario.email)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Ver Destinos
                  </button>
                ) : (
                  <div className="overflow-auto max-h-16">
                    <ul>
                      {preferenciasUsuario[usuario.email]?.map((destino, index) => (
                        <li key={index} className="cursor-pointer">
                          {destino.nombre} ({destino.nombre_continente})
                        </li>
                      ))}
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
