import { LoaderFunction } from "@remix-run/node";
import { fetchPreferencesData } from "~/services/preferenceService";

export const preferencesLoader: LoaderFunction = async ({ request }) => {
  try {
    // Get cookies from the request
    const cookieHeader = request.headers.get("Cookie");
    if (!cookieHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized - No cookies found" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Extract the token manually
    const tokenMatch = cookieHeader.match(/token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized - Token not found" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch preferences using the token
    const preferencesData = await fetchPreferencesData(token);
    return new Response(JSON.stringify(preferencesData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in preferencesLoader:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
