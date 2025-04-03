import { json, LoaderFunction, redirect } from "@remix-run/node";
import { fetchPreferencesData } from "~/services/preferenceService";
import { getTokenFromCookiesServer } from "~/utils/cookieUtils";
import * as jwt_decode from "jwt-decode";

// Función para verificar si el usuario es admin
function isAdmin(token: string): boolean {
  try {
    const decoded: any = jwt_decode.jwtDecode(token);
    return decoded.role === "ADMIN" || decoded.userType === "ADMIN";
  } catch (error) {
    console.error("[preferencesLoader] Error decodificando token:", error);
    return false;
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    console.log("[preferencesLoader] Initiating loader function");
    
    const cookieHeader = request.headers.get("Cookie");
    if (!cookieHeader) {
      console.error("[preferencesLoader] No cookies found");
      return redirect("/login");
    }

    try {
      const token = getTokenFromCookiesServer(request);

      if (!token) {
        console.error("[preferencesLoader] Token is required but was not provided");
        return redirect("/login");
      }

      // Verificar si el usuario es administrador
      if (!isAdmin(token)) {
        console.error("[preferencesLoader] User is not an admin. Access denied.");
        return redirect("/login");
      }

      console.log("[preferencesLoader] Token found, fetching preferences data");
      const response = await fetchPreferencesData(token);
      
      console.log(`[preferencesLoader] Successfully fetched ${response.length} preferences`);
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (tokenError) {
      console.error("[preferencesLoader] Error with token:", tokenError);
      return redirect("/login");
    }
  } catch (error) {
    console.error("[preferencesLoader] Error fetching data:", error);
    return redirect("/login");
  }
};
