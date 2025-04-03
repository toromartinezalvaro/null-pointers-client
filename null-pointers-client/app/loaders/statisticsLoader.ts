import { json, LoaderFunction, redirect } from "@remix-run/node";
import { fetchUsersWithPreferencesAndDestinations } from "~/services/statisticsService";
import { getTokenFromCookiesServer } from "~/utils/cookieUtils";
import * as jwt_decode from "jwt-decode";

// Función para verificar si el usuario es admin
function isAdmin(token: string): boolean {
  try {
    const decoded: any = jwt_decode.jwtDecode(token);
    return decoded.role === "ADMIN" || decoded.userType === "ADMIN";
  } catch (error) {
    console.error("[statisticsLoader] Error decodificando token:", error);
    return false;
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    console.log("[statisticsLoader] Initiating loader function");
    
    const cookieHeader = request.headers.get("Cookie");
    if (!cookieHeader) {
      console.error("[statisticsLoader] No cookies found");
      return redirect("/login");
    }

    try {
      const token = getTokenFromCookiesServer(request);

      if (!token) {
        console.error("[statisticsLoader] Token is required but was not provided");
        return redirect("/login");
      }

      // Verificar si el usuario es administrador
      if (!isAdmin(token)) {
        console.error("[statisticsLoader] User is not an admin. Access denied.");
        return redirect("/login");
      }

      console.log("[statisticsLoader] Token found, fetching statistics data");
      const response = await fetchUsersWithPreferencesAndDestinations(token);
      
      console.log(`[statisticsLoader] Successfully fetched data for ${response.length} users with preferences and destinations`);
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (tokenError) {
      console.error("[statisticsLoader] Error with token:", tokenError);
      return redirect("/login");
    }
  } catch (error) {
    console.error("[statisticsLoader] Error fetching data:", error);
    return redirect("/login");
  }
}; 