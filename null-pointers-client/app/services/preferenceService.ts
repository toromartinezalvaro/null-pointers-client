import { Preferencia } from "~/interfaces/preference";

const API_URL = "http://localhost:5220/api/preferencias";

export async function fetchPreferenciasData(): Promise<Preferencia[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error fetching data");

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}
