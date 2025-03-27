import { destinoService } from "~/services/destinoService";
import { json } from "@remix-run/node";

export async function loader() {
  try {
    // Recupera los datos de sessionStorage usando la API del lado del cliente
    const data = {
      destino: destinoService.destinoA,
      srcA: destinoService.srcA,
      srcE: destinoService.srcE, // Corrección: cambiar SrcE a srcE
      destinoE: destinoService.destinoE,
    };
    
    console.log("Datos cargados en loader:", data);
    
    // Si los valores son los predeterminados, intenta obtenerlos del sessionStorage
    if (data.srcA.includes("path/to/")) {
      data.srcA = "/imagenes/BoraBora.jpg"; // Imagen de respaldo predeterminada
    }
    
    return json({ data });
  } catch (error) {
    console.error("Error loading data:", error);
    return json({ 
      data: {
        destino: "Destino no disponible",
        srcA: "/imagenes/BoraBora.jpg", // Imagen de respaldo
        srcE: "/imagenes/Dubai.jpg",
        destinoE: "Dubai"
      }
    });
  }
}