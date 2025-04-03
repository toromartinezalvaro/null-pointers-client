import { json, LoaderFunction, redirect } from "@remix-run/node";
import { fetchDestinationData } from "~/services/destinationService";
import { getTokenFromCookiesServer } from "~/utils/cookieUtils";
import * as jwt_decode from "jwt-decode";

// Función para verificar si el usuario está autenticado
function isAuthenticated(token: string): boolean {
  try {
    const decoded: any = jwt_decode.jwtDecode(token);
    return !!decoded; // Si el token se puede decodificar, el usuario está autenticado
  } catch (error) {
    console.error("[destinationsLoader] Error decodificando token:", error);
    return false;
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    console.log("[destinationsLoader] Initiating loader function");
    
    const cookieHeader = request.headers.get("Cookie");
    if (!cookieHeader) {
      console.error("[destinationsLoader] No cookies found");
      return redirect("/login");
    }

    try {
      const token = getTokenFromCookiesServer(request);

      if (!token) {
        console.error("[destinationsLoader] Token is required but was not provided");
        return redirect("/login");
      }

      // Verificar si el usuario está autenticado
      if (!isAuthenticated(token)) {
        console.error("[destinationsLoader] Invalid token. Access denied.");
        return redirect("/login");
      }

      console.log("[destinationsLoader] Token found, fetching destinations data");
      const response = await fetchDestinationData(token);
      
      console.log(`[destinationsLoader] Successfully fetched destinations`);
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (tokenError) {
      console.error("[destinationsLoader] Error with token:", tokenError);
      return redirect("/login");
    }
  } catch (error) {
    console.error("[destinationsLoader] Error fetching data:", error);
    return redirect("/login");
  }
};
