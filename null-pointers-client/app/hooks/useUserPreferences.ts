import { useState, useCallback } from "react";
import { fetchWithCertBypass } from "~/utils/fetchUtil";
import { getTokenFromCookiesClient } from "~/utils/cookieUtils";
import { API_URL, API_CONFIG } from "~/constants/api";

interface UserPreference {
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

export function useUserPreferences() {
  const [preferenciasUsuario, setPreferenciasUsuario] = useState<UserPreference[]>([]);
  const [visibilidadPreferencias, setVisibilidadPreferencias] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPreferenciasUsuario = useCallback(async (email: string) => {
    try {
      setCargando(true);
      setError(null);
      
      console.log("[userPreferences] Loading preferences for:", email);
      
      // Get token
      const token = getTokenFromCookiesClient();
      
      if (!token) {
        throw new Error("Token is required but was not provided");
      }
      
      // Primero intentamos con el proxy interno
      try {
        console.log("[userPreferences] Intentando con proxy interno");
        const proxyUrl = `/api/proxy?path=/api/Destinos/by-email/${email}`;
        
        const proxyResponse = await fetch(proxyUrl, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (proxyResponse.ok) {
          const data = await proxyResponse.json();
          console.log("[userPreferences] Datos obtenidos del proxy:", data);
          
          // La respuesta ya es un array de destinos directamente, no necesitamos extraerlo
          setPreferenciasUsuario(data);
          setVisibilidadPreferencias(true);
          setCargando(false);
          return;
        } else {
          console.log("[userPreferences] El proxy falló, intentando método directo");
        }
      } catch (proxyError) {
        console.error("[userPreferences] Error en proxy, fallback a método directo:", proxyError);
      }
      
      // Si el proxy falla, intentamos directamente
      console.log("[userPreferences] Making direct HTTPS call to get user preferences");
      const response = await fetchWithCertBypass(`${API_URL}/api/Destinos/by-email/${email}`, {
        method: "GET",
        headers: {
          ...API_CONFIG.defaultHeaders,
          "Authorization": `Bearer ${token}`
        }
      });
      
      console.log(`[userPreferences] Response status: ${response.status}`);
      
      if (!response.ok) {
        throw new Error(`Error loading user preferences: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("[userPreferences] Received user preferences data:", data);
      
      // La respuesta ya es un array de destinos directamente
      setPreferenciasUsuario(data);
      setVisibilidadPreferencias(true);
    } catch (error) {
      console.error("[userPreferences] Error loading user preferences:", error);
      setError(error instanceof Error ? error.message : "Unknown error");
      setPreferenciasUsuario([]);
    } finally {
      setCargando(false);
    }
  }, []);

  return {
    preferenciasUsuario,
    visibilidadPreferencias,
    loadPreferenciasUsuario,
    cargando,
    error,
    setVisibilidadPreferencias,
  };
}
