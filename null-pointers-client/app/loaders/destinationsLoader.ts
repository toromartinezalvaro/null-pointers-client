import { json, LoaderFunction } from "@remix-run/node";

const API_URL = "http://localhost:5220/api/Destinos";

export const loader: LoaderFunction = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch destinations");
    const data = await response.json();
    return json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return json([]);
  }
};
