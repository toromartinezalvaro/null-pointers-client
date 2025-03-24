export const validateForm = (email: string, password: string, aceptado: boolean): string | null => {
  if (!email.trim()) return "Por favor, ingrese un correo.";
  if (!password.trim()) return "Por favor, ingrese una contraseña.";
  if (!aceptado) return "Debe aceptar los términos.";

  // Validación para contraseñas: Solo letras y números
  const passwordRegex = /^[a-zA-Z0-9]+$/;
  if (!passwordRegex.test(password)) {
    return "La contraseña solo puede contener letras y números.";
  }

  return null; // Sin errores
};
