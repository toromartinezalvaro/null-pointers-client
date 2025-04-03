import { Destination } from "~/interfaces/destination";
import { fetchWithCertBypass } from "~/utils/fetchUtil";
import { API_URL, API_CONFIG } from "~/constants/api";

export async function fetchDestinationData(token: string): Promise<Destination[]> {
  try {
    console.log(`[destinationService] Fetching destinations with token: ${token.substring(0, 10)}...`);
    
    // Intenta primero con el proxy interno para evitar CORS
    try {
      console.log('[destinationService] Trying with internal proxy first');
      const proxyResponse = await fetch(`/api/proxy?path=/api/Destinos`, {
        method: "GET",
        headers: {
          ...API_CONFIG.defaultHeaders,
          "Authorization": `Bearer ${token}`
        },
        credentials: 'include',
      });
      
      if (proxyResponse.ok) {
        console.log('[destinationService] Proxy fetch successful');
        const data = await proxyResponse.json();
        console.log(`[destinationService] Received ${Array.isArray(data) ? data.length : 0} destinations via proxy`);
        return Array.isArray(data) ? data : [];
      } else {
        console.log('[destinationService] Proxy failed, trying direct method', proxyResponse.status);
      }
    } catch (proxyError) {
      console.error('[destinationService] Proxy error, falling back to direct method:', proxyError);
    }
    
    // Fallback to direct API call
    const response = await fetchWithCertBypass(`${API_URL}/api/Destinos`, {
      method: "GET",
      headers: {
        ...API_CONFIG.defaultHeaders,
        "Authorization": `Bearer ${token}`
      },
      credentials: 'include'
    });

    if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);

    const data = await response.json();
    console.log(`[destinationService] Received ${Array.isArray(data) ? data.length : 0} destinations`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}
