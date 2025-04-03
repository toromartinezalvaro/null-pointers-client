import { User } from "~/interfaces/user";
import { fetchWithCertBypass } from "~/utils/fetchUtil";
import { API_URL, API_CONFIG } from "~/constants/api";

export async function fetchUserPreferences(email: string, token: string) {
  try {
    console.log(`[userService] Fetching user preferences for ${email}`);
    
    // Intenta primero con el proxy interno para evitar CORS
    try {
      console.log('[userService] Trying with internal proxy first');
      const proxyResponse = await fetch(`/api/proxy?path=/api/Destinos/by-email/${email}`, {
        method: "GET",
        headers: {
          ...API_CONFIG.defaultHeaders,
          "Authorization": `Bearer ${token}`
        },
        credentials: 'include',
      });
      
      if (proxyResponse.ok) {
        console.log('[userService] Proxy fetch successful');
        const data = await proxyResponse.json();
        console.log(`[userService] Received user preferences via proxy`);
        return data;
      } else {
        console.log('[userService] Proxy failed, trying direct method', proxyResponse.status);
      }
    } catch (proxyError) {
      console.error('[userService] Proxy error, falling back to direct method:', proxyError);
    }
    
    // Fallback to direct API call
    const response = await fetchWithCertBypass(`${API_URL}/api/Destinos/by-email/${email}`, {
      method: "GET",
      headers: {
        ...API_CONFIG.defaultHeaders,
        "Authorization": `Bearer ${token}`
      },
      credentials: 'include'
    });

    console.log(`[userService] Response status: ${response.status}`);
    if (!response.ok) {
      throw new Error(`Error al obtener las preferencias del usuario: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[userService] Received data`);
    return data;
  } catch (error) {
    console.error("[userService] Error in fetchUserPreferences:", error);
    throw error;
  }
}

export async function fetchAllUsersData(token: string): Promise<User[]> {
  try {
    console.log(`[userService] Fetching all users data`);
    
    // Intenta primero con el proxy interno para evitar CORS
    try {
      console.log('[userService] Trying with internal proxy first');
      const proxyResponse = await fetch(`/api/proxy?path=/api/usuarios`, {
        method: "GET",
        headers: {
          ...API_CONFIG.defaultHeaders,
          "Authorization": `Bearer ${token}`
        },
        credentials: 'include',
      });
      
      if (proxyResponse.ok) {
        console.log('[userService] Proxy fetch successful');
        const data = await proxyResponse.json();
        console.log(`[userService] Received ${Array.isArray(data) ? data.length : 0} users via proxy`);
        return Array.isArray(data) ? data : [];
      } else {
        console.log('[userService] Proxy failed, trying direct method', proxyResponse.status);
      }
    } catch (proxyError) {
      console.error('[userService] Proxy error, falling back to direct method:', proxyError);
    }
    
    // Fallback to direct API call
    const response = await fetchWithCertBypass(`${API_URL}/api/usuarios`, {
      method: "GET",
      headers: {
        ...API_CONFIG.defaultHeaders,
        "Authorization": `Bearer ${token}`
      },
      credentials: 'include'
    });

    if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);

    const data = await response.json();
    console.log(`[userService] Received ${Array.isArray(data) ? data.length : 0} users`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("[userService] Fetch error:", error);
    return [];
  }
}

export async function fetchData(email: string, token: string) {
  try {
    console.log(`[userService] Fetching data for ${email}`);
    
    // Intenta primero con el proxy interno para evitar CORS
    try {
      console.log('[userService] Trying with internal proxy first');
      const proxyResponse = await fetch(`/api/proxy?path=/api/Destinos/by-email/${email}`, {
        method: "GET",
        headers: {
          ...API_CONFIG.defaultHeaders,
          "Authorization": `Bearer ${token}`
        },
        credentials: 'include',
      });
      
      if (proxyResponse.ok) {
        console.log('[userService] Proxy fetch successful');
        const data = await proxyResponse.json();
        console.log(`[userService] Received data via proxy`);
        return data;
      } else {
        console.log('[userService] Proxy failed, trying direct method', proxyResponse.status);
      }
    } catch (proxyError) {
      console.error('[userService] Proxy error, falling back to direct method:', proxyError);
    }
    
    // Fallback to direct API call
    const response = await fetchWithCertBypass(`${API_URL}/api/Destinos/by-email/${email}`, {
      method: "GET",
      headers: {
        ...API_CONFIG.defaultHeaders,
        "Authorization": `Bearer ${token}`
      },
      credentials: 'include'
    });
    
    console.log(`[userService] Response status for fetchData: ${response.status}`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[userService] Error in fetchData:", error);
    throw error;
  }
}

export async function createUser(userData: User, token: string) {
  try {
    console.log(`[userService] Creating user`);
    
    // Intenta primero con el proxy interno para evitar CORS
    try {
      console.log('[userService] Trying with internal proxy first');
      const proxyResponse = await fetch(`/api/proxy?path=/api/usuarios`, {
        method: "POST",
        headers: {
          ...API_CONFIG.defaultHeaders,
          "Authorization": `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });
      
      if (proxyResponse.ok) {
        console.log('[userService] Proxy create user successful');
        const data = await proxyResponse.json();
        console.log(`[userService] User created via proxy`);
        return data;
      } else {
        console.log('[userService] Proxy failed, trying direct method', proxyResponse.status);
      }
    } catch (proxyError) {
      console.error('[userService] Proxy error, falling back to direct method:', proxyError);
    }
    
    // Fallback to direct API call
    const response = await fetchWithCertBypass(`${API_URL}/api/usuarios`, {
      method: "POST",
      headers: {
        ...API_CONFIG.defaultHeaders,
        "Authorization": `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    
    console.log(`[userService] Response status for createUser: ${response.status}`);
    if (!response.ok) {
      throw new Error(`Error creating user: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[userService] Error in createUser:", error);
    throw error;
  }
}