export const authenticate = async (email: string, password: string) => {
  const response = await fetch("http://localhost:3000/users");
  if (!response.ok) throw new Error("Error al obtener datos del servidor.");
  const users = await response.json();
  return users.find((user: { email: string; password: string }) => user.email === email && user.password === password);
};
