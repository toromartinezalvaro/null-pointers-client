import { Preferencia } from "~/interfaces/preference";
import { fetchWithCertBypass } from "~/utils/fetchUtil";
import { API_URL, API_CONFIG } from "~/constants/api";

export async function fetchPreferencesData(token: string): Promise<Preferencia[]> {
  try {
    console.log(`[preferenceService] Fetching preferences data`);
    
    // Intenta primero con el proxy interno para evitar CORS
    try {
      console.log('[preferenceService] Trying with internal proxy first');
      const proxyResponse = await fetch(`/api/proxy?path=/api/preferencias`, {
        method: "GET",
        headers: {
          ...API_CONFIG.defaultHeaders,
          "Authorization": `Bearer ${token}`
        },
        credentials: 'include',
      });
      
      if (proxyResponse.ok) {
        console.log('[preferenceService] Proxy fetch successful');
        const data = await proxyResponse.json();
        console.log(`[preferenceService] Received ${Array.isArray(data) ? data.length : 0} preferences via proxy`);
        return Array.isArray(data) ? data : [];
      } else {
        console.log('[preferenceService] Proxy failed, trying direct method', proxyResponse.status);
      }
    } catch (proxyError) {
      console.error('[preferenceService] Proxy error, falling back to direct method:', proxyError);
    }
    
    // Fallback to direct API call
    const response = await fetchWithCertBypass(`${API_URL}/api/preferencias`, {
      method: "GET",
      headers: {
        ...API_CONFIG.defaultHeaders,
        "Authorization": `Bearer ${token}`
      },
      credentials: 'include'
    });

    if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);

    const data = await response.json();
    console.log(`[preferenceService] Received ${Array.isArray(data) ? data.length : 0} preferences`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("[preferenceService] Fetch error:", error);
    return [];
  }
}
