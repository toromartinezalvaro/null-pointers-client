/*logica para proteger vistas*/
import { useAuth } from "~/hooks/useAuth";
import { Navigate } from "@remix-run/react";

export default function DestinationsReport() {
  
 /*logica para proteger vistas*/
 const { authorized, reason } = useAuth("Administrador");

 if (!authorized) {
   return <Navigate to="/login" replace />;
 }
  return (
    <div>
      <h2>Destinations Report</h2>
      <p>Here you will see all destination-related reports.</p>
    </div>
  );
}
