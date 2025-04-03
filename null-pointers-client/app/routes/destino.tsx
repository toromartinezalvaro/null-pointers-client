import { useNavigate } from "@remix-run/react";
import { useAuth } from "~/hooks/useAuth";

interface Destino {
  id: number;
  comidaTipica: string;
  createdAt: string;
  idioma: string;
  imgUrl: string;
  lugarImperdible: string;
  nombre: string;
  pais: string;
  continentesId: number;
}

export default function Destino() {
  const navigate = useNavigate();
  const { authorized } = useAuth(["CLIENT", "ADMIN"]);

  if (!authorized) {
    navigate("login");
    return null;
  }

  const storedDestinos = sessionStorage.getItem("destinos");
  const destinos: Destino[] = storedDestinos ? JSON.parse(storedDestinos) : [];

  const destinoUno = destinos[0];
  const destinoDos = destinos[1];

  return (
    <main className="bg-[#000835] min-h-[94vh] h-[94vh] w-full overflow-auto flex flex-col px-4 sm:px-6 md:px-8">
      {/* Barra superior con botón de volver */}
      <div className="w-full py-5 sticky top-0 bg-[#000835] z-10">
        <div className="max-w-7xl mx-auto">
          <button 
            className="bg-[#3a8bff] text-white px-5 py-2 rounded-md hover:bg-blue-600 transition-colors"
            onClick={() => navigate("/resultados")}
          >
            Volver a Resultados
          </button>
        </div>
      </div>

      {/* Contenido principal centrado */}
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-7xl mx-auto">
        {/* Título separado, pero no tan abajo como antes */}
        <h1 className="text-white text-4xl font-bold mb-8 sm:mb-16 md:mb-24 text-center -mt-2 sm:-mt-[20px] md:-mt-[60px] leading-normal sm:leading-[0] py-[0px]">Tus Destinos</h1>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {[
            { destino: destinoUno, titulo: "Aventura en América", id: "America" },
            { destino: destinoDos, titulo: "Aventura en Europa", id: "Europa" },
          ].map(({ destino, titulo, id }) => (
            <section 
              key={id} 
              className="bg-[#c5d5f9] rounded-md overflow-hidden flex flex-col h-[450px] md:h-[500px]"
            >
              {/* Cabecera */}
              <div className="bg-[#3a8bff] p-3">
                <h2 className="text-white text-xl font-bold text-center">
                  {titulo}
                </h2>
              </div>

              {/* Nombre del destino */}
              <div className="py-3 text-center">
                <label htmlFor={`destino${id}`} className="sr-only">Nombre del destino</label>
                <input
                  value={destino?.nombre || ""}
                  className="text-xl font-bold text-center bg-transparent border-none focus:outline-none w-full animate-[fadeIn_1s_ease-in]"
                  type="text"
                  readOnly
                  id={`destino${id}`}
                  aria-label={`Nombre del destino ${id}`}
                />
              </div>

              {/* Imagen y detalles */}
              <div className="relative flex-1 overflow-hidden group">
                {/* Imagen */}
                <img 
                  src={destino?.imgUrl || "/imagenes/default.png"} 
                  alt={`Destino en ${id}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay que aparece al hacer hover */}
                <div className="absolute inset-0 bg-[#000835]/90 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-300 flex flex-col justify-center p-6">
                  <div className="space-y-4">
                    {/* País */}
                    <div className="flex flex-col">
                      <label htmlFor={`pais${id}`} className="text-[#3a8bff] text-sm font-medium">País</label>
                      <input 
                        id={`pais${id}`}
                        className="bg-transparent text-white border-b border-[#3a8bff]/30 pb-1 focus:outline-none text-lg" 
                        type="text" 
                        value={destino?.pais || ""} 
                        readOnly
                        aria-label={`País de ${destino?.nombre || 'destino'}`}
                      />
                    </div>
                    
                    {/* Idioma */}
                    <div className="flex flex-col">
                      <label htmlFor={`idioma${id}`} className="text-[#3a8bff] text-sm font-medium">Idioma</label>
                      <input 
                        id={`idioma${id}`}
                        className="bg-transparent text-white border-b border-[#3a8bff]/30 pb-1 focus:outline-none text-lg" 
                        type="text" 
                        value={destino?.idioma || ""} 
                        readOnly
                        aria-label={`Idioma de ${destino?.nombre || 'destino'}`}
                      />
                    </div>
                    
                    {/* Lugar imperdible */}
                    <div className="flex flex-col">
                      <label htmlFor={`lugar${id}`} className="text-[#3a8bff] text-sm font-medium">Lugar Imperdible</label>
                      <input 
                        id={`lugar${id}`}
                        className="bg-transparent text-white border-b border-[#3a8bff]/30 pb-1 focus:outline-none text-lg" 
                        type="text" 
                        value={destino?.lugarImperdible || ""} 
                        readOnly
                        aria-label={`Lugar imperdible de ${destino?.nombre || 'destino'}`}
                      />
                    </div>
                    
                    {/* Comida típica */}
                    <div className="flex flex-col">
                      <label htmlFor={`comida${id}`} className="text-[#3a8bff] text-sm font-medium">Comida Típica</label>
                      <input 
                        id={`comida${id}`}
                        className="bg-transparent text-white border-b border-[#3a8bff]/30 pb-1 focus:outline-none text-lg" 
                        type="text" 
                        value={destino?.comidaTipica || ""} 
                        readOnly
                        aria-label={`Comida típica de ${destino?.nombre || 'destino'}`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de explora */}
              <div className="p-3 bg-white flex justify-center">
                <button 
                  onClick={() => {
                    sessionStorage.setItem("selectedDestination", JSON.stringify(destino));
                    navigate("/plans")
                  }}
                  className="bg-[#3a8bff] text-white px-5 py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition-colors"
                  title="Explora tus opciones"
                  aria-label="Explora tus opciones"
                >
                  <span>Explorar opciones</span>
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}