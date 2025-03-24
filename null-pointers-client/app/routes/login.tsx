import { useLoaderData } from "@remix-run/react";
/*import { loader } from "~/loaders/users";*/
import Login from "~/components/Login";
import { User } from "~/interfaces/user"; // Importa el tipo User

//export { loader };

export default function LoginPage() {
  // Especifica el tipo de los datos cargados
  const users = useLoaderData<User[]>();

  return (
    <div>
      <Login /></div>
  );
}
