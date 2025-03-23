import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir al login
import "~/styles/record.css";
import { registerUser } from "../services/recordService"; // Verifica esta rut
import { UserRecord } from "~/interfaces/UserRecord"; // Importa la interfaz de datos

const RegisterForm: React.FC = () => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // Estado del checkbox
  const [successMessage, setSuccessMessage] = useState(false); // Estado del mensaje de éxito
  const navigate = useNavigate(); // Hook para redirigir al login

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const user: UserRecord = {
      email: formData.get("email") as string,
      nombre: formData.get("nombre") as string,
      password: formData.get("password") as string,
    };

    // Validación de campos requeridos
    if (!user.email || !user.nombre || !user.password) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      // Usa el servicio para enviar datos al backend
      const response = await registerUser(user);
      console.log("Usuario registrado exitosamente:", response);

      setSuccessMessage(true); // Mostrar mensaje de éxito

      setTimeout(() => {
        navigate("/login"); // Redirigir al login
        setSuccessMessage(false); // Ocultar mensaje después de redirigir
      }, 3000);
    } catch (error) {
      console.error("Error durante el registro:", error);
      alert("Ocurrió un problema al registrar al usuario.");
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(event.target.checked); // Actualiza el estado del checkbox
  };

  return (
    <div id="Registercon">
      <form id="formRegister" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Enter your name"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <label id="terms">
          <input 
            type="checkbox"
         
            onChange={handleCheckboxChange}
            checked={isCheckboxChecked}
          />
        {" "}
            Acepto los{" "}
            <a
              id="terms"
              href="https://amadeus.com/es/politicas/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>términos y condiciones</strong>
            </a>{" "}
            de la política de protección de datos.
          </label>
        <button id="button" type="submit" disabled={!isCheckboxChecked}>
          Registrarse
        </button>
        <a
              id="terms"
              href="/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Ya estoy Resgistrado</strong>
         </a>


      </form>
      {successMessage && (
        <div id="mensaje-exito">
          <p>¡Registro exitoso! Redirigiendo...</p>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
