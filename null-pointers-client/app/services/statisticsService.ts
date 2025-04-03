import { UserWithPreferencesAndDestinations } from "~/interfaces/userWithPreferencesAndDestinations";

const API_URL = "http://localhost:5220/api/Usuarios/with-preferences-destinations";

export async function fetchUsersWithPreferencesAndDestinations(token: string): Promise<UserWithPreferencesAndDestinations[]> {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
} 