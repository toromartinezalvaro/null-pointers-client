import { useState } from "react";
import ContactModal from "./ContactModal";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Destination {
  nombre: string;
  nombre_continente?: string;
  id: number;
  comidaTipica: string;
  createdAt: string;
  idioma: string;
  imgUrl: string;
  lugarImperdible: string;
  pais: string;
  continentesId: number;
  continentes: null;
}

interface User {
  nombre: string;
  email: string;
}

interface UsersTableProps {
  usuariosData: User[];
  preferenciasUsuario: Destination[]; // Actualizada para usar la interfaz Destination
  visibilidadPreferencias: boolean;
  loadPreferenciasUsuario: (email: string) => void;
  cargando: boolean;
  error?: string | null;
}

export default function UsersTable({
  usuariosData,
  preferenciasUsuario,
  visibilidadPreferencias,
  loadPreferenciasUsuario,
  cargando,
  error,
}: UsersTableProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  if (!usuariosData || usuariosData.length === 0) {
    return <div>No users found.</div>;
  }

  const handleViewDestinations = (email: string) => {
    setSelectedEmail(email);
    loadPreferenciasUsuario(email);
  };

  const openContactModal = (usuario: User) => {
    setSelectedUser(usuario);
    setContactModalOpen(true);
  };

  const closeContactModal = () => {
    setContactModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="bg-gray-100 rounded-lg shadow-md overflow-auto max-h-[91vh] scrollbar-hide">
        <table className="w-full bg-white text-center text-sm">
          <thead className="sticky top-0 h-12 bg-white">
            <tr>
              <th className="p-1.5 border-b border-gray-200 bg-gray-800 text-white w-[20%] text-xs">Nombre</th>
              <th className="p-1.5 border-b border-gray-200 bg-gray-800 text-white w-[25%] text-xs">Email</th>
              <th className="p-1.5 border-b border-gray-200 bg-gray-800 text-white w-[35%] max-w-[400px] text-xs">Destinos Recomendados</th>
              <th className="p-1.5 border-b border-gray-200 bg-gray-800 text-white w-[20%] text-xs">Contacto</th>
            </tr>
          </thead>
          <tbody>
            {usuariosData.map((usuario) => (
              <tr key={usuario.email}>
                <td className="p-1.5 border-b border-gray-200 h-16 text-xs">{usuario.nombre}</td>
                <td className="p-1.5 border-b border-gray-200 h-16 text-xs">{usuario.email}</td>
                <td className="p-1.5 border-b border-gray-200 h-16 max-w-[400px]">
                  {selectedEmail !== usuario.email || !visibilidadPreferencias ? (
                    <button
                      onClick={() => handleViewDestinations(usuario.email)}
                      className="px-3 py-1.5 rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 text-xs"
                      disabled={cargando && selectedEmail === usuario.email}
                    >
                      {cargando && selectedEmail === usuario.email ? "Cargando..." : "Ver Destinos"}
                    </button>
                  ) : (
                    <div className="flex items-start gap-2 h-full max-w-[350px]">
                      <button
                        onClick={() => setSelectedEmail(null)}
                        className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all duration-200 flex-shrink-0 mt-0.5"
                        title="Ocultar destinos"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                      {error ? (
                        <div className="text-red-500 text-xs">Error: {error}</div>
                      ) : (
                        <ul className="flex flex-col flex-1 list-none m-0">
                          {preferenciasUsuario.length > 0 ? (
                            preferenciasUsuario.map((destino) => (
                              <li 
                                key={destino.id} 
                                className="px-2 py-0.5 my-0.5 rounded bg-gray-50 text-xs hover:bg-gray-100 transition-all duration-200"
                              >
                                {destino.nombre}{" "}
                                {destino.pais ? `(${destino.pais})` : ""}
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500 text-xs">No hay destinos para este usuario</li>
                          )}
                        </ul>
                      )}
                    </div>
                  )}
                </td>
                <td className="p-1.5 border-b border-gray-200 h-16">
                  <button
                    onClick={() => openContactModal(usuario)}
                    className="px-3 py-1.5 rounded bg-emerald-500 text-white cursor-pointer hover:bg-emerald-600 transition-all duration-200 hover:scale-105 text-xs"
                  >
                    Contactar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ContactModal 
        isOpen={contactModalOpen}
        onClose={closeContactModal}
        user={selectedUser}
      />
    </>
  );
}
