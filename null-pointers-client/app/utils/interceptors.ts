/**
 * Global fetch interceptor to handle CORS and SSL issues
 * 
 * This file is meant to be imported in the main client entry point.
 */

export function setupFetchInterceptor() {
  // Make sure we're in a browser environment
  if (typeof window === 'undefined') {
    console.log('[FetchInterceptor] Not in browser environment, skipping setup');
    return;
  }
  
  // Store original fetch
  const originalFetch = window.fetch;
  
  // Override fetch with our custom implementation
  window.fetch = async function(input: RequestInfo | URL, init?: RequestInit) {
    const url = typeof input === 'string' ? input : input.toString();
    console.log(`[FetchInterceptor] Intercepted fetch call to: ${url}`);
    
    // Add default options to all requests if not provided
    const enhancedOptions: RequestInit = {
      ...init,
      credentials: init?.credentials || 'include', // Include cookies by default
      headers: {
        ...init?.headers,
        'Content-Type': init?.headers?.['Content-Type'] || 'application/json',
        'Accept': 'application/json'
      }
    };
    
    try {
      // Call original fetch with our modified options
      const response = await originalFetch(input, enhancedOptions);
      console.log(`[FetchInterceptor] Response status: ${response.status}`);
      return response;
    } catch (error) {
      console.error('[FetchInterceptor] Error with fetch request:', error);
      throw error;
    }
  };
  
  console.log('[FetchInterceptor] Global fetch interceptor is now active');
} 