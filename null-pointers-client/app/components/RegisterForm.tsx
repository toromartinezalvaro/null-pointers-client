import React from "react";
import "~/styles/RegisterForm.css";
import { useRegisterForm } from "~/hooks/useRegisterForm";

const RegisterForm: React.FC = () => {
  const { mensajeExito, aceptado, manejarCambio, manejarEnvio } = useRegisterForm();

  return (
    <div id="Registercon">
      <form id="formRegister" onSubmit={manejarEnvio} method="POST">
        <input type="email" id="email" name="email" placeholder="Enter your email" />
        <input type="text" id="nombre" name="nombre" placeholder="Enter your full name"  />
        <input type="password" id="password" name="password" placeholder="Enter your password" />
        <label id="terms">
          <input type="checkbox" onChange={manejarCambio} checked={aceptado} />
          Acepto los{" "}
          <a href="https://amadeus.com/es/politicas/privacy-policy" target="_blank" rel="noopener noreferrer">
            <strong>términos y condiciones</strong>
          </a>
        </label>
        <button type="submit" id="button" disabled={!aceptado}>
          ¡Registrarse!
        </button>
      </form>
      {mensajeExito && <p>¡Registro exitoso! Redirigiendo...</p>}
    </div>
  );
};

export default RegisterForm;
