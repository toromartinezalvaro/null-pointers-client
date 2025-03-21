import { User } from "~/interfaces/user";

export async function usersLoader(): Promise<User[]> {
  try {
    const response = await fetch("http://localhost:5220/api/usuarios");
    if (!response.ok) throw new Error("Error fetching users");

    const users: User[] = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
