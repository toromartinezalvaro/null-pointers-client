import Login from "~/components/Login";
import { authenticate } from "~/services/auth";
import { useCheckbox } from "~/hooks/useCheckbox"; // Hook para manejar el checkbox

export default function LoginPage() {
  const { checked: aceptado, handleChange: manejarCambio } = useCheckbox(false);

  return (
    <Login
      authenticate={authenticate}
      aceptado={aceptado}
      manejarCambio={manejarCambio}
    />
  );
}
 