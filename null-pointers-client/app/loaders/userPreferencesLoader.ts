import { LoaderFunctionArgs } from "@remix-run/node";
import { fetchWithCertBypass } from "~/utils/fetchUtil";
import { API_URL } from "~/constants/api";

export async function userPreferencesLoader({ params, request }: LoaderFunctionArgs) {
  const { email } = params;
  if (!email) throw new Response("Email is required", { status: 400 });

  try {
    console.log(`[userPreferencesLoader] Fetching preferences for email: ${email}`);
    
    // Primero intenta con el proxy interno
    try {
      console.log('[userPreferencesLoader] Trying with internal proxy first');
      const proxyResponse = await fetch(`/api/proxy?path=/api/preferencias/usuario/${email}`, {
        method: "GET"
      });
      
      if (proxyResponse.ok) {
        console.log('[userPreferencesLoader] Proxy fetch successful');
        const data = await proxyResponse.json();
        return data;
      } else {
        console.log('[userPreferencesLoader] Proxy failed, trying direct method', proxyResponse.status);
      }
    } catch (proxyError) {
      console.error('[userPreferencesLoader] Proxy error, falling back to direct method:', proxyError);
    }
    
    // Si el proxy falla, intenta directamente
    const response = await fetchWithCertBypass(`${API_URL}/api/preferencias/usuario/${email}`);
    if (!response.ok) throw new Error("Error fetching user preferences");

    const preferencias = await response.json();
    return preferencias;
  } catch (error) {
    console.error("Error in userPreferencesLoader:", error);
    return [];
  }
}
