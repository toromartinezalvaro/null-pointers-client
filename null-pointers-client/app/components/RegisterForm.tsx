import React, { useState } from "react";
import "~/styles/record.css";
import { registerUser } from "../services/recordService";
import { UserRecord } from "~/interfaces/UserRecord";

const RegisterForm: React.FC = () => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false); // Estado del mensaje de éxito
  const [selectedRole, setSelectedRole] = useState<string>(""); // Estado para el rol seleccionado

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const user: UserRecord = {
      email: formData.get("email") as string,
      nombre: formData.get("nombre") as string,
      password: formData.get("password") as string,
      userType: selectedRole, // Incluye el rol seleccionado
    };

    // Validación de campos requeridos
    if (!user.email || !user.nombre || !user.password || !user.userType) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      // Usa el servicio para enviar datos al backend
      const response = await registerUser(user);
      console.log("Usuario registrado exitosamente:", response);

      setSuccessMessage(true); // Mostrar mensaje de éxito

      setTimeout(() => {
        window.location.href = "/login"; // Redirigir al login
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

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value); // Actualiza el rol seleccionado
  };

  return (
    <div id="Registercon">
      <form id="formRegister" className="form-container" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
          className="input"
        />
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Enter your name"
          required
          className="input"
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
          className="input"
        />

        {/* Selección de Rol con etiqueta dentro del campo */}
        <select 
          value={selectedRole} 
          onChange={handleRoleChange} 
          required
          aria-label="Selecciona tu rol"
        >
          <option value="" disabled>
            Selecciona tu rol:{" "}
          </option>
          <option value="CLIENT">Cliente</option>
          <option value="ADMIN">Administrador</option>
        </select>

        <label id="terms">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={isCheckboxChecked}
          />{" "}
          Acepto los{" "}
          <a
            id="terms-link"
            href="https://amadeus.com/es/politicas/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>términos y condiciones</strong>
          </a>{" "}
          de la política de protección de datos.
        </label>
        <button className="registerButton" id="button" type="submit" disabled={!isCheckboxChecked}>
          Registrarse
        </button>
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
