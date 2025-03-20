export const validateForm = (email: string, password: string, aceptado: boolean): string | null => {
  if (!email.trim() && !password.trim() && !aceptado) {
    return "Todos los campos están vacíos.";
  }
  if (!email.trim()) return "Por favor, ingrese un correo.";
  if (!password.trim()) return "Por favor, ingrese una contraseña.";
  if (!aceptado) return "Debe aceptar los términos.";
  return null;
};
