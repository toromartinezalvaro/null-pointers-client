import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { API_URL } from "~/constants/api";

/**
 * API Proxy route to bypass CORS issues
 * This route acts as a server-side proxy to the actual API
 */

// Helper function to safely JSON stringify an object for logging
function safeStringify(obj: any): string {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    return `[Error serializing object: ${e.message}]`;
  }
}

// Handle GET requests (Loader function)
export async function loader({ request }: LoaderArgs) {
  try {
    const url = new URL(request.url);
    const targetPath = url.searchParams.get("path");
    
    if (!targetPath) {
      console.log("[API Proxy] Missing path parameter");
      return new Response(JSON.stringify({ error: "Missing 'path' parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    const targetUrl = `${API_URL}${targetPath}`;
    
    console.log(`[API Proxy] Forwarding GET request to: ${targetUrl}`);
    console.log(`[API Proxy] API_URL is: ${API_URL}`);
    
    // Forward all headers except host
    const headers = new Headers();
    for (const [key, value] of request.headers.entries()) {
      if (key.toLowerCase() !== "host") {
        headers.set(key, value);
      }
    }
    
    // If we have a cookie header, forward it
    const cookie = request.headers.get("Cookie");
    if (cookie) {
      headers.set("Cookie", cookie);
    }
    
    try {
      console.log(`[API Proxy] Sending GET request to ${targetUrl}`);
      console.log(`[API Proxy] With headers: ${safeStringify(Object.fromEntries([...headers.entries()]))}`);
      
      // Set NODE_TLS_REJECT_UNAUTHORIZED to bypass cert validation
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      
      const response = await fetch(targetUrl, {
        method: "GET",
        headers,
      });
      
      // Reset the environment variable after the request
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
      
      console.log(`[API Proxy] Received response with status: ${response.status}`);
      
      const responseText = await response.text();
      console.log(`[API Proxy] Response body (first 100 chars): ${responseText.substring(0, 100)}${responseText.length > 100 ? '...' : ''}`);
      
      // Forward the response back to the client
      return new Response(responseText, {
        status: response.status,
        headers: {
          "Content-Type": response.headers.get("Content-Type") || "application/json",
        },
      });
    } catch (fetchError) {
      console.error(`[API Proxy] Fetch error for ${targetUrl}:`, fetchError);
      return new Response(
        JSON.stringify({ 
          error: "Error connecting to API", 
          details: fetchError.message,
          url: targetUrl
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("[API Proxy] General error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal Server Error", 
        details: error.message
      }), 
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Handle POST, PUT, DELETE requests (Action function)
export async function action({ request }: ActionArgs) {
  try {
    const url = new URL(request.url);
    const targetPath = url.searchParams.get("path");
    
    if (!targetPath) {
      console.log("[API Proxy] Missing path parameter");
      return new Response(JSON.stringify({ error: "Missing 'path' parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    const targetUrl = `${API_URL}${targetPath}`;
    
    console.log(`[API Proxy] Forwarding ${request.method} request to: ${targetUrl}`);
    console.log(`[API Proxy] API_URL is: ${API_URL}`);
    
    // Forward all headers except host
    const headers = new Headers();
    for (const [key, value] of request.headers.entries()) {
      if (key.toLowerCase() !== "host") {
        headers.set(key, value);
      }
    }
    
    // If we have a cookie header, forward it
    const cookie = request.headers.get("Cookie");
    if (cookie) {
      headers.set("Cookie", cookie);
    }
    
    // Get request body
    let body = "";
    try {
      body = await request.text();
      console.log(`[API Proxy] Request body: ${body.substring(0, 100)}${body.length > 100 ? '...' : ''}`);
    } catch (bodyError) {
      console.error("[API Proxy] Error reading request body:", bodyError);
    }
    
    try {
      console.log(`[API Proxy] Sending ${request.method} request to ${targetUrl}`);
      console.log(`[API Proxy] With headers: ${safeStringify(Object.fromEntries([...headers.entries()]))}`);
      
      // Set NODE_TLS_REJECT_UNAUTHORIZED to bypass cert validation
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      
      // Forward the request to the API
      const response = await fetch(targetUrl, {
        method: request.method,
        headers,
        body: body || undefined,
      });
      
      // Reset the environment variable after the request
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
      
      console.log(`[API Proxy] ${request.method} response status: ${response.status}`);
      
      // Get response body to log for debugging
      const responseText = await response.text();
      console.log(`[API Proxy] Response body (first 100 chars): ${responseText.substring(0, 100)}${responseText.length > 100 ? '...' : ''}`);
      
      // Create a new response with the same body
      return new Response(responseText, {
        status: response.status,
        headers: {
          "Content-Type": response.headers.get("Content-Type") || "application/json",
        },
      });
    } catch (fetchError) {
      console.error(`[API Proxy] Fetch error for ${targetUrl}:`, fetchError);
      return new Response(
        JSON.stringify({ 
          error: "Error connecting to API", 
          details: fetchError.message,
          url: targetUrl,
          method: request.method
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("[API Proxy] General error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal Server Error", 
        details: error.message
      }), 
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
} 