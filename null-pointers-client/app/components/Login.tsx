import React from "react";
import { LoginFormValues } from "~/interfaces/loginForm";
import "~/styles/login.css";
import { authenticate } from "~/services/auth";

interface LoginProps {
  navigate: (to: string) => void;
}

export default function Login({ navigate }: LoginProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: LoginFormValues = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    if (!data.email || !data.password) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const user = await authenticate(data.email, data.password);
      if (user) {
        sessionStorage.setItem(
          "userAuthData",
          JSON.stringify({
            token: user.token,
            role: user.userType,
            email: data.email,
          })
        );

        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `token=${user.token}; path=/; SameSite=Strict;`;
        console.log("Current cookies:", document.cookie);

        // Dispatch custom event to notify userAuth changes
        window.dispatchEvent(new Event("userAuthChange"));

        if (user.userType === "ADMIN") {
          navigate("/reports/destinations");
        } else if (user.userType === "CLIENT") {
          navigate("/tarjetas");
        }
      } else {
        alert("Usuario no existe");
      }
    } catch (error) {
      console.error("Error al autenticar:", error);
      alert("Error en la solicitud.");
    }
  };

  return (
    <div id="container2" className="login-container">
      <form id="formRegister" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Introduce tu correo electrónico"
          required
          autoComplete="email"
          className="input"
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Introduce tu contraseña"
          required
          autoComplete="current-password"
          className="input"
        />
        <button
          type="submit"
          className="sessionButton"
          id="button"
        >
          Iniciar Sesión
        </button>

        <div className="registerLinkContainer">
        <span>¿Aún no tienes cuenta?</span>
        <a href="/record" className="registerLink">
          <strong>Registrarse</strong>
        </a>
        </div>
      </form>
    </div>
  );
}
