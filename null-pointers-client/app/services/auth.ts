import { API_URL } from "../constants/api";
import { AuthenticatedUser } from "~/interfaces/AuthenticatedUser";

export const authenticate = async (
  email: string,
  password: string
): Promise<{ token: string; userType: string } | null> => {
  try {
    const response = await fetch(`${API_URL}/api/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      console.error("Authentication error:", response.statusText);
      return null;
    }

    const user: AuthenticatedUser = await response.json();
    return user;
  } catch (error) {
    console.error("Error during authentication:", error);
    return null;
  }
};
