import { useNavigate } from "@remix-run/react";
import Login from "~/components/Login";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <Login
      navigate={navigate}
    />
  );
}
