import { UserWithPreferencesAndDestinations } from "~/interfaces/userWithPreferencesAndDestinations";
import { fetchWithCertBypass } from "~/utils/fetchUtil";
import { API_URL, API_CONFIG } from "~/constants/api";

export async function fetchUsersWithPreferencesAndDestinations(token: string): Promise<UserWithPreferencesAndDestinations[]> {
  try {
    console.log(`[statisticsService] Fetching users with preferences and destinations`);
    
    // Intenta primero con el proxy interno para evitar CORS
    try {
      console.log('[statisticsService] Trying with internal proxy first');
      const proxyResponse = await fetch(`/api/proxy?path=/api/Usuarios/with-preferences-destinations`, {
        method: "GET",
        headers: {
          ...API_CONFIG.defaultHeaders,
          "Authorization": `Bearer ${token}`
        },
        credentials: 'include',
      });
      
      if (proxyResponse.ok) {
        console.log('[statisticsService] Proxy fetch successful');
        const data = await proxyResponse.json();
        console.log(`[statisticsService] Received ${Array.isArray(data) ? data.length : 0} users with preferences via proxy`);
        return Array.isArray(data) ? data : [];
      } else {
        console.log('[statisticsService] Proxy failed, trying direct method', proxyResponse.status);
      }
    } catch (proxyError) {
      console.error('[statisticsService] Proxy error, falling back to direct method:', proxyError);
    }
    
    // Fallback to direct API call
    const response = await fetchWithCertBypass(`${API_URL}/api/Usuarios/with-preferences-destinations`, {
      method: "GET",
      headers: {
        ...API_CONFIG.defaultHeaders,
        "Authorization": `Bearer ${token}`
      },
      credentials: 'include'
    });

    if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);

    const data = await response.json();
    console.log(`[statisticsService] Received ${Array.isArray(data) ? data.length : 0} users with preferences`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("[statisticsService] Fetch error:", error);
    return [];
  }
} 