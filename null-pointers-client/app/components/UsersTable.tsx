import "~/styles/users.css";
import { useState } from "react";
import ContactModal from "./ContactModal";

interface Destination {
  nombre: string;
  nombre_continente: string;
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
  preferenciasUsuario: any[]; // Updated type
  visibilidadPreferencias: boolean; // Updated type
  loadPreferenciasUsuario: (email: string) => void;
  cargando: boolean; // Updated type
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
      <div className="table-container">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th className="w-1/5">Nombre</th>
              <th className="w-1/5">Email</th>
              <th className="w-2/5">Destinos Recomendados</th>
              <th className="w-1/5">Contacto</th>
            </tr>
          </thead>
          <tbody>
            {usuariosData.map((usuario) => (
              <tr key={usuario.email}>
                <td className="table-cell w-1/5">{usuario.nombre}</td>
                <td className="table-cell w-1/5">{usuario.email}</td>
                <td className="table-cell w-2/5">
                  {selectedEmail !== usuario.email || !visibilidadPreferencias ? (
                    <button
                      onClick={() => handleViewDestinations(usuario.email)}
                      className="button button-view"
                      disabled={cargando && selectedEmail === usuario.email}
                    >
                      {cargando && selectedEmail === usuario.email ? "Cargando..." : "Ver Destinos"}
                    </button>
                  ) : (
                    <div className="destinations-container">
                      <button
                        onClick={() => setSelectedEmail(null)}
                        className="button button-hide"
                      >
                        Ocultar Destinos
                      </button>
                      {error ? (
                        <div className="error-message">Error: {error}</div>
                      ) : (
                        <ul className="destinations-list">
                          {preferenciasUsuario.length > 0 ? (
                            preferenciasUsuario.map((destino, index) => (
                              <li key={index} className="destination-item">
                                {destino.nombre}{" "}
                                {destino.nombre_continente
                                  ? `(${destino.nombre_continente})`
                                  : ""}
                              </li>
                            ))
                          ) : (
                            <li>No hay destinos para este usuario</li>
                          )}
                        </ul>
                      )}
                    </div>
                  )}
                </td>
                <td className="table-cell w-1/5">
                  <button
                    onClick={() => openContactModal(usuario)}
                    className="button button-contact"
                  >
                    Contactar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de contacto como componente separado */}
      <ContactModal 
        isOpen={contactModalOpen}
        onClose={closeContactModal}
        user={selectedUser}
      />
    </>
  );
}
