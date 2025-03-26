import React from "react";
import { useNavigate } from "@remix-run/react";
import { validateForm } from "~/utils/validations";
import { authenticate } from "~/services/auth";
import { useCheckbox } from "~/hooks/useCheckbox"; // Importa el hook
import { LoginFormValues } from "~/interfaces/loginForm"; // Importa la interfaz
import "~/styles/login.css";


export default function Login() {
  const { checked: aceptado, handleChange: manejarCambio } = useCheckbox(false); // Usa el hook
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Tipamos los datos del formulario con la interfaz LoginFormValues
    const data: LoginFormValues = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      aceptado, // Usamos el valor del hook useCheckbox
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
        // Guardar token y rol en sessionStorage
        sessionStorage.setItem(
          "userAuthData",
          JSON.stringify({
            token: user.token,
            role: user.userType,
            email: data.email
          })
        );

        // Redirigir según el rol
        if (user.userType === "ADMIN") {
          navigate("/reports/destinations"); // Vista para administradores
        } else if (user.userType === "CLIENT") {
          navigate("/tarjetas"); // Vista para clientes
        }
      } else {
        alert("Usuario no existe"); // Usuario no encontrado
      }
    } catch (error) {
      console.error("Error al autenticar:", error);
      alert("Error en la solicitud."); // Error al conectarse o lógica interna
    }
  };

  return (
    <div id="container2">
      <div id="Registercon">
        <img src="public/assets/img/registro.png" id="imgrec" className="imgrec" alt="Imagen de registro" />
        <form id="formRegister" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Introduce tu correo electrónico"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Introduce tu contraseña"
            required
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
