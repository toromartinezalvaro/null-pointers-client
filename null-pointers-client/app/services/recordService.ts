import { API_URL, API_CONFIG } from "../constants/api"; // URL del backend y configuración
import { UserRecord } from "../interfaces/UserRecord"; // Interfaz para tipado de datos
import { fetchWithCertBypass } from "~/utils/fetchUtil"; // Importamos la utilidad para bypass de certificados

export const registerUser = async (user: UserRecord) => {
  try {
    console.log(`[recordService] Registering new user with email: ${user.email}`);
    
    // Intenta primero con el proxy interno para evitar CORS
    try {
      console.log('[recordService] Trying with internal proxy first');
      const proxyResponse = await fetch(`/api/proxy?path=/api/usuarios`, {
        method: "POST",
        headers: {
          ...API_CONFIG.defaultHeaders,
        },
        credentials: 'include',
        body: JSON.stringify(user),
      });
      
      if (proxyResponse.ok) {
        console.log('[recordService] Proxy registration successful');
        const data = await proxyResponse.json();
        console.log(`[recordService] User registered via proxy`);
        return data;
      } else {
        console.log('[recordService] Proxy failed, trying direct method', proxyResponse.status);
      }
    } catch (proxyError) {
      console.error('[recordService] Proxy error, falling back to direct method:', proxyError);
    }
    
    // Fallback to direct API call
    const response = await fetchWithCertBypass(`${API_URL}/api/usuarios`, {
      method: "POST",
      headers: {
        ...API_CONFIG.defaultHeaders,
      },
      credentials: 'include',
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error ${response.status}: ${errorData.message || "Error desconocido"}`
      );
    }

    return await response.json(); // Devuelve la respuesta del backend
  } catch (error) {
    if (error instanceof Error) {
      console.error("[recordService] Error al registrar usuario:", error.message);
      throw error;
    } else {
      throw new Error("[recordService] Error desconocido al registrar usuario");
    }
  }
};
