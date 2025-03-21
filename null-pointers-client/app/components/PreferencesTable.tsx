import { PreferenciasLabels } from "../constants/preferences";
import { Preferencia } from "../interfaces/preference";

interface PreferencesTableProps {
  preferenciasData: Preferencia[];
}

export default function PreferencesTable({ preferenciasData }: PreferencesTableProps) {
  return (
    <table className="preferences-table">
      <thead>
        <tr>
          <th>Entorno</th>
          <th>Clima</th>
          <th>Actividad</th>
          <th>Alojamiento</th>
          <th>Tiempo de Viaje</th>
          <th>Rango de Edad</th>
          <th>Destinos</th>
        </tr>
      </thead>
      <tbody>
        {preferenciasData.map((preferencia, i) => (
          <tr key={i} className={i % 2 === 0 ? "even-row" : "odd-row"}>
            <td>{PreferenciasLabels[preferencia.entorno as keyof typeof PreferenciasLabels] || preferencia.entorno}</td>
            <td>{PreferenciasLabels[preferencia.clima as keyof typeof PreferenciasLabels] || preferencia.clima}</td>
            <td>{PreferenciasLabels[preferencia.actividad as keyof typeof PreferenciasLabels] || preferencia.actividad}</td>
            <td>{PreferenciasLabels[preferencia.alojamiento as keyof typeof PreferenciasLabels] || preferencia.alojamiento}</td>
            <td>{PreferenciasLabels[preferencia.tiempoViaje as keyof typeof PreferenciasLabels] || preferencia.tiempoViaje}</td>
            <td>{PreferenciasLabels[preferencia.rangoEdad as keyof typeof PreferenciasLabels] || preferencia.rangoEdad}</td>
            <td>
              <ul>
                {Array.isArray(preferencia.destinoResponseList) &&
                  preferencia.destinoResponseList.map((destino, index) => (
                    <li key={index}>
                      {destino.nombre} ({destino.nombre_continente})
                    </li>
                  ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
