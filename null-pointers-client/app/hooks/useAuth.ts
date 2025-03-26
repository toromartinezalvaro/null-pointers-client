export const useAuth = (requiredRoles: string[]) => {
  if (typeof window === "undefined") {
    // Si estamos en el servidor, devolvemos un estado no autorizado
    return { authorized: false, reason: "SSR: sessionStorage no disponible" };
  }

  const userAuth = JSON.parse(sessionStorage.getItem("userAuthData") || "{}");
  const { role, token } = userAuth;

  if (!token) {
    return { authorized: false, reason: "No autenticado" };
  }

  if (!requiredRoles.includes(role)) {
    return { authorized: false, reason: "Rol no autorizado" };
  }

  return { authorized: true }; // Usuario autenticado y con rol correcto
};
