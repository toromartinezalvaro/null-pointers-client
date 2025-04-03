/**
 * Utility function to make fetch requests that handle HTTPS certificate validation issues
 * This is especially useful for development environments with self-signed certificates
 */
export async function fetchWithCertBypass(url: string, options: RequestInit = {}) {
  try {
    // Add debugging information
    console.log(`[fetchWithCertBypass] Making request to: ${url}`);
    console.log(`[fetchWithCertBypass] Request method: ${options.method || 'GET'}`);
    
    // Create a clean options object
    const enhancedOptions: RequestInit = {
      ...options,
      credentials: options.credentials || 'include', // Include cookies by default
    };
    
    // For Node.js environments (server-side rendering in Remix)
    if (typeof process !== 'undefined' && process.versions && process.versions.node) {
      // We need to bypass SSL certificate validation in Node environment
      // This is only for development and should not be used in production
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      
      // Make the fetch request
      const response = await fetch(url, enhancedOptions);
      
      // Reset the environment variable after the request
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
      
      // Log response status
      console.log(`[fetchWithCertBypass] Response status: ${response.status}`);
      return response;
    } else {
      // Browser environment - just use regular fetch
      // Make the fetch request
      const response = await fetch(url, enhancedOptions);
      
      // Log response status
      console.log(`[fetchWithCertBypass] Response status: ${response.status}`);
      return response;
    }
  } catch (error) {
    // Log detailed error information
    console.error('[fetchWithCertBypass] Error with fetch request:', error);

    // If there's a certificate error, log it specially
    if (error instanceof Error && error.message.includes('certificate')) {
      console.error('[fetchWithCertBypass] Certificate validation error detected');
    }
    
    throw error;
  }
} 