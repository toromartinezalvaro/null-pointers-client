import { useState, useEffect } from "react";

export const useAuth = (requiredRoles: string[]) => {
  const [auth, setAuth] = useState<{ authorized: boolean; reason?: string }>({
    authorized: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      setAuth({ authorized: false, reason: "SSR: sessionStorage no disponible" });
      return;
    }

    const storedData = sessionStorage.getItem("userAuthData");
    if (!storedData) {
      setAuth({ authorized: false, reason: "No hay datos de autenticación" });
      return;
    }

    try {
      const userAuth = JSON.parse(storedData);
      const token = userAuth.token;
      const role = userAuth.role;

      if (!token) {
        setAuth({ authorized: false, reason: "No autenticado" });
      } else if (!requiredRoles.includes(role)) {
        setAuth({ authorized: false, reason: "Rol no autorizado" });
      } else {
        setAuth({ authorized: true });
      }
    } catch (error) {
      setAuth({ authorized: false, reason: "Error al parsear los datos de autenticación" });
    }
  }, [requiredRoles]);

  return auth;
};