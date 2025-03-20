export async function fetchUserPreferences(email: string) {
  const response = await fetch(`http://localhost:5220/api/preferencias/usuario/${email}`);
  if (!response.ok) throw new Error("Error al cargar preferencias");
  return await response.json();
}
