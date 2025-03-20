import { useState } from "react";
import { fetchUserPreferences } from "../services/userService";

interface Destination {
  nombre: string;
  nombre_continente: string;
}

export function useUserPreferences() {
  const [preferenciasUsuario, setPreferenciasUsuario] = useState<{ [email: string]: Destination[] }>({});
  const [visibilidadPreferencias, setVisibilidadPreferencias] = useState<{ [email: string]: boolean }>({});

  async function loadPreferenciasUsuario(email: string) {
    if (preferenciasUsuario[email]) {
      setVisibilidadPreferencias((prev) => ({ ...prev, [email]: !prev[email] }));
      return;
    }

    try {
      const preferencias = await fetchUserPreferences(email);
      setPreferenciasUsuario((prev) => ({
        ...prev,
        [email]: preferencias[0]?.destinos || [],
      }));
      setVisibilidadPreferencias((prev) => ({ ...prev, [email]: true }));
    } catch (error) {
      console.error("Error al cargar preferencias:", error);
    }
  }

  return {
    preferenciasUsuario,
    visibilidadPreferencias,
    loadPreferenciasUsuario,
  };
}
