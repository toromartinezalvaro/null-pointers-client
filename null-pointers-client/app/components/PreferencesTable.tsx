import { PreferenciasLabels } from "../constants/PreferenciasLabels";
import { Preferencia } from "../interfaces/preference";

interface PreferencesTableProps {
  preferenciasData: Preferencia[];
}

export default function PreferencesTable({ preferenciasData }: PreferencesTableProps) {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-blue-600 text-white text-left">
            <th className="px-4 py-3">Entorno</th>
            <th className="px-4 py-3">Clima</th>
            <th className="px-4 py-3">Actividad</th>
            <th className="px-4 py-3">Alojamiento</th>
            <th className="px-4 py-3">Tiempo de Viaje</th>
            <th className="px-4 py-3">Rango de Edad</th>
            {/* <th className="px-4 py-3">Destinos</th> */}
          </tr>
        </thead>
        <tbody>
          {preferenciasData.map((preferencia, i) => (
            <tr key={i} className={`${i % 2 === 0 ? "bg-gray-100" : "bg-white"} border-b hover:bg-gray-200 transition-all` }>
              <td className="px-4 py-3">{PreferenciasLabels[preferencia.entorno as keyof typeof PreferenciasLabels] || preferencia.entorno}</td>
              <td className="px-4 py-3">{PreferenciasLabels[preferencia.clima as keyof typeof PreferenciasLabels] || preferencia.clima}</td>
              <td className="px-4 py-3">{PreferenciasLabels[preferencia.actividad as keyof typeof PreferenciasLabels] || preferencia.actividad}</td>
              <td className="px-4 py-3">{PreferenciasLabels[preferencia.alojamiento as keyof typeof PreferenciasLabels] || preferencia.alojamiento}</td>
              <td className="px-4 py-3">{PreferenciasLabels[preferencia.tiempoViaje as keyof typeof PreferenciasLabels] || preferencia.tiempoViaje}</td>
              <td className="px-4 py-3">{PreferenciasLabels[preferencia.rangoEdad as keyof typeof PreferenciasLabels] || preferencia.rangoEdad}</td>
              {/* <td className="px-4 py-3">
                <ul className="list-disc pl-4">
                  {Array.isArray(preferencia.destinoResponseList) &&
                    preferencia.destinoResponseList.map((destino, index) => (
                      <li key={index} className="text-gray-700">{destino.nombre} ({destino.nombre_continente})</li>
                    ))}
                </ul>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
