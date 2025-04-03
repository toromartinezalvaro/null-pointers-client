import { API_URL, API_CONFIG } from "../constants/api";
import { AuthenticatedUser } from "~/interfaces/AuthenticatedUser";
import { fetchWithCertBypass } from "~/utils/fetchUtil";

export const authenticate = async (
  email: string,
  password: string
): Promise<{ token: string; userType: string } | null> => {
  try {
    console.log(`Starting authentication for email: ${email}`);
    
    // Primero intenta con el proxy interno (método principal)
    try {
      console.log('[AuthService] Trying with internal proxy...');
      
      // Usamos fetch estándar para el proxy interno
      const response = await fetch('/api/proxy?path=/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      console.log(`[AuthService] Proxy response status: ${response.status}`);
      
      if (response.ok) {
        const responseText = await response.text();
        console.log(`[AuthService] Proxy response body: ${responseText.substring(0, 50)}...`);
        
        try {
          const user = JSON.parse(responseText);
          console.log('[AuthService] Successfully parsed user data from proxy');
          return user;
        } catch (parseError) {
          console.error('[AuthService] Error parsing proxy response:', parseError);
          console.error('[AuthService] Raw response:', responseText);
        }
      } else {
        const errorText = await response.text();
        console.error(`[AuthService] Proxy error (${response.status}):`, errorText);
      }
    } catch (proxyError) {
      console.error('[AuthService] Error using proxy:', proxyError);
    }
    
    // Si el proxy falló, intenta directamente con la API
    console.log('[AuthService] Trying direct API call...');
    const directResponse = await fetchWithCertBypass(`${API_URL}/api/Auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    console.log(`[AuthService] Direct API response status: ${directResponse.status}`);
    
    if (!directResponse.ok) {
      const errorText = await directResponse.text();
      console.error(`[AuthService] Direct API error (${directResponse.status}):`, errorText);
      return null;
    }

    const user: AuthenticatedUser = await directResponse.json();
    console.log('[AuthService] Successfully parsed user data from direct API');
    return user;
  } catch (error) {
    console.error("Error during authentication:", error);
    return null;
  }
};

export const logout = (): void => {
  // Remove session data
  sessionStorage.removeItem("userAuthData");
  
  // Clear token cookie
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
  // Dispatch event to notify changes
  window.dispatchEvent(new Event("userAuthChange"));
};
