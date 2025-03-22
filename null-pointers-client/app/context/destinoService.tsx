/* eslint-disable react/prop-types */
import { createContext, useContext, useState, ReactNode } from 'react';

interface DestinoContextType {
  indice: number;
  setIndice: React.Dispatch<React.SetStateAction<number>>;
  destinoA: string;
  setDestinoA: React.Dispatch<React.SetStateAction<string>>;
  destinoE: string;
  setDestinoE: React.Dispatch<React.SetStateAction<string>>;
  respuestasSer: string[];
  setRespuestasSer: React.Dispatch<React.SetStateAction<string[]>>;
  nombreS: string;
  setNombreS: React.Dispatch<React.SetStateAction<string>>;
  correoS: string;
  setCorreoS: React.Dispatch<React.SetStateAction<string>>;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  srcA: string;
  setSrcA: React.Dispatch<React.SetStateAction<string>>;
  srcE: string;
  setSrcE: React.Dispatch<React.SetStateAction<string>>;
  enviarDestino: (nomUsuario: string, correoUsuario: string) => Promise<void>;
}

const DestinoContext = createContext<DestinoContextType | undefined>(undefined);

export const useDestino = () => {
  const context = useContext(DestinoContext);
  if (context === undefined) {
    throw new Error("useDestino must be used within a DestinoProvider");
  }
  return context;
};

interface DestinoProviderProps {
  children: ReactNode;
}

export const DestinoProvider: React.FC<DestinoProviderProps> = ({ children }) => {
  const [indice, setIndice] = useState<number>(0);  //Inicializa el estado de indice en 0
  const [destinoA, setDestinoA] = useState<string>("");
  const [destinoE, setDestinoE] = useState<string>("");
  const [respuestasSer, setRespuestasSer] = useState<string[]>([]);
  const [nombreS, setNombreS] = useState<string>("");
  const [correoS, setCorreoS] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [srcA, setSrcA] = useState<string>("");
  const [srcE, setSrcE] = useState<string>("");

  const enviarDestino = async (nomUsuario: string, correoUsuario: string) => {
    const data = {
      nombre: nomUsuario,
      email: correoUsuario,
      entorno: sessionStorage.getItem('respuesta_0'), 
      clima: sessionStorage.getItem('respuesta_1'), 
      actividad: sessionStorage.getItem('respuesta_2'), 
      alojamiento: sessionStorage.getItem('respuesta_3'), 
      tiempo_viaje: sessionStorage.getItem('respuesta_4'), 
      rango_edad: sessionStorage.getItem('respuesta_5'),
    };
//Este POST sirve para enviar los datos de preferencias del usuario a la Mock API
    try {
      const response = await fetch('/api/preferencias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      setDestinoA(result.destinos[0].nombre);
      setDestinoE(result.destinos[1].nombre);

      sessionStorage.setItem('destinoAmerica', result.destinos[0].nombre);
      sessionStorage.setItem('destinoEuropa', result.destinos[1].nombre);
      sessionStorage.setItem('destinos', JSON.stringify(result.destinos));

      console.log('Destino A:', result.destinos[0].nombre);
      console.log('Destino E:', result.destinos[1].nombre);
    } catch (error) {
      console.error('Error al enviar destino:', error);
    }
  };

  return (
    <DestinoContext.Provider value={{
      indice, setIndice,
      destinoA, setDestinoA,
      destinoE, setDestinoE,
      respuestasSer, setRespuestasSer,
      nombreS, setNombreS,
      correoS, setCorreoS,
      avatar, setAvatar,
      srcA, setSrcA,
      srcE, setSrcE,
      enviarDestino
    }}>
      {children}
    </DestinoContext.Provider>
  );
};
