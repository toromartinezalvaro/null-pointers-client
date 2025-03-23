import { API_URL } from "../constants/api"; // URL base de la API
console.log("API_URL:", API_URL);

import { UserRecord } from "../interfaces/UserRecord"; // Interfaz de datos

export const registerUser = async (user: UserRecord) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user), // Enviar los datos del usuario como JSON
    });

    // Verificar si la respuesta no es exitosa
    if (!response.ok) {
      const errorData = await response.json(); // Extrae el mensaje del backend
      throw new Error(`Error ${response.status}: ${errorData.message || "Error desconocido"}`);
    }

    return await response.json(); // Devuelve el resultado de la respuesta
  } catch (error) {
    // Manejo explícito del tipo `error`
    if (error instanceof Error) {
      console.error("Error al registrar usuario:", error.message); // Maneja el caso si `error` es una instancia de `Error`
      throw error; // Lanza el error para que el componente o hook lo maneje
    } else {
      console.error("Error desconocido:", error); // Manejo para cualquier otro tipo de error
      throw new Error("Error desconocido al registrar usuario");
    }
  }

  console.log("El archivo se está ejecutando correctamente");

};





