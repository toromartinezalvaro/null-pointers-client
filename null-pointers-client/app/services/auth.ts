
import { API_URL } from "~/constants/api"; // Importa la URL base de la API
import { AuthenticatedUser } from "~/interfaces/AuthenticatedUser";

export const authenticate = async (
  email: string,
  password: string
): Promise<AuthenticatedUser | undefined> => {
  try {
    // Realiza una solicitud POST a la API
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Envía las credenciales
    });

    // Maneja errores si la autenticación falla
    if (!response.ok) {
      console.error("Error de autenticación:", response.statusText);
      return undefined;
    }

    // Extrae los datos del usuario autenticado
    const user: AuthenticatedUser = await response.json();
    return user; // Retorna el usuario autenticado con sus datos
  } catch (error) {
    console.error("Error durante la autenticación:", error);
    return undefined; // Retorna undefined en caso de error
  }
};









/*import { API_URL } from "~/constants/api"; // Importa la URL de la API
import { AuthenticatedUser } from "~/interfaces/AuthenticatedUser";



export const authenticate = async (
  email: string,
  password: string
): Promise<AuthenticatedUser | undefined> => {
  const users: AuthenticatedUser[] = [
    {
      email: "admin@example.com",
      password: "123456",
      role: "Administrador",
      token: "admin-token-123",
    },
    {
      email: "cliente@example.com",
      password: "123456",
      role: "Cliente",
      token: "cliente-token-456",
    },
  ];

  // Busca al usuario según las credenciales
  return users.find(
    (user) => user.email === email.trim() && user.password === password.trim()
  );
};*/



