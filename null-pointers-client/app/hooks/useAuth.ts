export const useAuth = (requiredRole: string) => {
  if (typeof window === "undefined") {
    // Si estamos en el servidor, devolvemos un estado no autorizado
    return { authorized: false, reason: "SSR: localStorage no disponible" };
  }

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return { authorized: false, reason: "No autenticado" };
  }

  if (role !== requiredRole) {
    return { authorized: false, reason: "Rol no autorizado" };
  }

  return { authorized: true }; // Usuario autenticado y con rol correcto
};
