import { json, LoaderFunction } from "@remix-run/node";
import { fetchDestinationData } from "~/services/destinationService";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const cookieHeader = request.headers.get("Cookie");
    if (!cookieHeader) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - No cookies found" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const tokenMatch = cookieHeader.match(/token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - Token not found" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const response = await fetchDestinationData(token);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return json([]);
  }
};
