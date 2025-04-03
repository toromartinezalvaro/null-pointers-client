import { json, LoaderFunction, redirect } from "@remix-run/node";
import { fetchAllUsersData } from "~/services/userService";
import { getTokenFromCookiesServer } from "~/utils/cookieUtils";
import * as jwt_decode from "jwt-decode";

// Función para verificar si el usuario es admin
function isAdmin(token: string): boolean {
  try {
    const decoded: any = jwt_decode.jwtDecode(token);
    return decoded.role === "ADMIN" || decoded.userType === "ADMIN";
  } catch (error) {
    console.error("[usersLoader] Error decodificando token:", error);
    return false;
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    console.log("[usersLoader] Initiating loader function");
    
    const cookieHeader = request.headers.get("Cookie");
    if (!cookieHeader) {
      console.error("[usersLoader] No cookies found");
      return redirect("/login");
    }

    try {
      const token = getTokenFromCookiesServer(request);

      if (!token) {
        console.error("[usersLoader] Token is required but was not provided");
        return redirect("/login");
      }

      // Verificar si el usuario es administrador
      if (!isAdmin(token)) {
        console.error("[usersLoader] User is not an admin. Access denied.");
        return redirect("/login");
      }

      console.log("[usersLoader] Token found, fetching users data");
      const response = await fetchAllUsersData(token);
      
      console.log(`[usersLoader] Successfully fetched ${response.length} users`);
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (tokenError) {
      console.error("[usersLoader] Error with token:", tokenError);
      return redirect("/login");
    }
  } catch (error) {
    console.error("[usersLoader] Error fetching data:", error);
    return redirect("/login");
  }
};
