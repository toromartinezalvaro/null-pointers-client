import React from "react";
import { useNavigate } from "@remix-run/react";
import { validateForm } from "~/utils/validations";
import { LoginFormValues } from "~/interfaces/loginForm"; // Interfaz de formulario
import "~/styles/login.css";
import { authenticate } from "~/services/auth";
import { useCheckbox } from "~/hooks/useCheckbox"; // Hook para manejar el checkbox


export default function Login() {
  const navigate = useNavigate();

  const { checked: aceptado, handleChange: manejarCambio } = useCheckbox(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: LoginFormValues = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      aceptado,
    };

    // Validación
    const error = validateForm(data.email, data.password, data.aceptado);
    if (error) {
      alert(error);
      return;
    }

    try {
      const user = await authenticate(data.email, data.password);
      if (user) {
        sessionStorage.setItem(
          "userAuthData",
          JSON.stringify({token: user.token, role: user.userType, email: data.email })
        );

        document.cookie = `token=${user.token}; path=/; SameSite=Strict;`;
        console.log("Current cookies:", document.cookie);

        if (user.userType === "ADMIN") {
          navigate("/reports/destinations");
        } else if (user.userType === "CLIENT") {
          navigate("/reports");
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
    <div id="container2">
      <div id="Registercon">
        <img src="/assets/img/registro.png" id="imgrec" className="imgrec" alt="Imagen de registro" />
        <form id="formRegister" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Introduce tu correo electrónico"
            required
            autoComplete="email"
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Introduce tu contraseña"
            required
            autoComplete="current-password"
          />
          <label id="terms">
            <input
              type="checkbox"
              id="checkboxTerms"
              onChange={manejarCambio}
              checked={aceptado}
            />
            Acepto los{" "}
            <a
              href="https://amadeus.com/es/politicas/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>términos y condiciones</strong>
            </a>.
          </label>
          <button type="submit" className="sessionButton" id="button" disabled={!aceptado}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
