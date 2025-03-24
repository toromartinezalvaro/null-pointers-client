import { destinoService } from "~/services/destinoService";

export async function loader() {
  try {
    const data = {
      destino: destinoService.destinoA,
      srcA: destinoService.srcA,
      SrcE: destinoService.srcE,
      destinoE: destinoService.destinoE,
    };
    return {
      data,
    };
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
}  