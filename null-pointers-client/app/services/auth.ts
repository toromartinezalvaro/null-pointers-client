import { API_URL } from "~/constants/login"; // Importa la URL de la API

export const authenticate = async (email: string, password: string) => {
  const response = await fetch(API_URL); // Usa la constante API_URL
  if (!response.ok) throw new Error("Error al obtener datos del servidor.");
  const users = await response.json();
  return users.find((user: { email: string; password: string }) => user.email === email && user.password === password);
};
