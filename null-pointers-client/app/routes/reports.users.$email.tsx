import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, Navigate } from "@remix-run/react";
import { fetchWithCertBypass } from "~/utils/fetchUtil";
import { API_URL, API_CONFIG } from "~/constants/api";
import { getTokenFromCookiesServer } from "~/utils/cookieUtils";

/*logica para proteger vistas*/
import { useAuth } from "~/hooks/useAuth";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { email } = params;

  if (!email) {
    return json({ error: "Email no especificado" }, { status: 400 });
  }

  try {
    // Obtener token de las cookies
    const token = getTokenFromCookiesServer(request);
    
    if (!token) {
      console.error("Token not found in cookies");
      return json({ error: "Unauthorized - Token not found" }, { status: 401 });
    }
    
    console.log(`[userDetails] Fetching data for email: ${email}`);
    
    // Primero intenta con el proxy interno
    try {
      console.log('[userDetails] Trying with internal proxy first');
      const proxyResponse = await fetch(`/api/proxy?path=/api/Destinos/by-email/${email}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (proxyResponse.ok) {
        console.log('[userDetails] Proxy fetch successful');
        const data = await proxyResponse.json();
        return data[0]?.destinos || [];
      } else {
        console.log('[userDetails] Proxy failed, trying direct method', proxyResponse.status);
      }
    } catch (proxyError) {
      console.error('[userDetails] Proxy error, falling back to direct method:', proxyError);
    }
    
    // Si el proxy falla, intenta directamente
    const response = await fetchWithCertBypass(`${API_URL}/api/Destinos/by-email/${email}`, {
      method: "GET",
      headers: {
        ...API_CONFIG.defaultHeaders,
        "Authorization": `Bearer ${token}`
      },
      credentials: 'include'
    });
    
    console.log(`[userDetails] Direct API response status: ${response.status}`);
    if (!response.ok) {
      console.error(`[userDetails] Error response: ${response.status} ${response.statusText}`);
      throw new Error(`Error al cargar preferencias: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("[userDetails] Received data successfully");
    return data[0]?.destinos || [];
  } catch (error) {
    console.error("[userDetails] Error en loader de preferencias:", error);
    return [];
  }
}

export default function UserPreferences() {
  const preferencias = useLoaderData<{ nombre: string; nombre_continente: string }[]>();

/*logica para proteger vistas*/
const { authorized } = useAuth(["ADMIN"]);

if (!authorized) {
  return <Navigate to="/login" replace />;
}

  return (
    <div className="overflow-auto max-h-16">
      <ul>
        {preferencias.map((destino, index) => (
          <li key={index} className="cursor-pointer">
            {destino.nombre} ({destino.nombre_continente})
          </li>
        ))}
      </ul>
    </div>
  );
}
