import React, { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { validateForm } from "~/utils/validations";
import { authenticate } from "~/services/auth";
import "~/styles/login.css";

export default function Login() {
  const [aceptado, setAceptado] = useState(false);
  const navigate = useNavigate();

  const manejarCambio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAceptado(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const error = validateForm(email, password, aceptado);
    if (error) {
      alert(error);
      return;
    }

    try {
      const user = await authenticate(email, password);
      if (user) {
        navigate("/index"); /*Enrutar*/
      } else {
        alert("Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error al autenticar:", error);
      alert("Error en la solicitud.");
    }
  };

  return (
    <div id="container2">
      <div id="Registercon">
        <img src="public/assets/img/registro.png" id="imgrec" alt="Imagen de registro" />
        <form id="formRegister" onSubmit={handleSubmit}>
          <input type="email" id="email" name="email" placeholder="Introduce tu correo electrónico" />
          <input type="password" id="password" name="password" placeholder="Introduce tu contraseña" />
          <label id="terms">
            <input type="checkbox" onChange={manejarCambio} checked={aceptado} />
            Acepto los{" "}
            <a href="https://amadeus.com/es/politicas/privacy-policy" target="_blank" rel="noopener noreferrer">
              <strong>términos y condiciones</strong>
            </a>.
          </label>
          <button type="submit" id="button" disabled={!aceptado}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
