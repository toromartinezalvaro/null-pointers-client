import { useLoaderData } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { loader } from "~/loaders/statisticsLoader";
import { UserWithPreferencesAndDestinations, Preferencia, Destino } from "~/interfaces/userWithPreferencesAndDestinations";
import statisticsStylesHref from "~/styles/statistics.css?url";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from "recharts";
import { useMemo } from "react";

export { loader };

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: statisticsStylesHref },
];

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', 
  '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'
];

export default function Statistics() {
  const usersData = useLoaderData<typeof loader>() as UserWithPreferencesAndDestinations[];
  
  // Datos para las tarjetas de resumen
  const totalUsers = usersData.length;
  const usersWithPreferences = usersData.filter(user => user.preferencias.length > 0).length;
  const usersWithDestinations = usersData.filter(user => user.destinos.length > 0).length;
  const adminUsers = usersData.filter(user => user.userType === "ADMIN").length;
  const clientUsers = usersData.filter(user => user.userType === "CLIENT").length;
  
  // Datos para el gráfico de tipos de usuario
  const userTypeData = [
    { name: 'Administradores', value: adminUsers },
    { name: 'Clientes', value: clientUsers }
  ];
  
  // Datos para el gráfico de entornos preferidos
  const environmentData = useMemo(() => {
    const environments: { [key: string]: number } = {};
    
    usersData.forEach(user => {
      user.preferencias.forEach(pref => {
        if (!environments[pref.entorno]) {
          environments[pref.entorno] = 0;
        }
        environments[pref.entorno]++;
      });
    });
    
    return Object.entries(environments).map(([name, value]) => ({ name, value }));
  }, [usersData]);
  
  // Datos para el gráfico de climas preferidos
  const climateData = useMemo(() => {
    const climates: { [key: string]: number } = {};
    
    usersData.forEach(user => {
      user.preferencias.forEach(pref => {
        if (!climates[pref.clima]) {
          climates[pref.clima] = 0;
        }
        climates[pref.clima]++;
      });
    });
    
    return Object.entries(climates).map(([name, value]) => ({ name, value }));
  }, [usersData]);
  
  // Datos para el gráfico de actividades preferidas
  const activityData = useMemo(() => {
    const activities: { [key: string]: number } = {};
    
    usersData.forEach(user => {
      user.preferencias.forEach(pref => {
        if (!activities[pref.actividad]) {
          activities[pref.actividad] = 0;
        }
        activities[pref.actividad]++;
      });
    });
    
    return Object.entries(activities).map(([name, value]) => ({ name, value }));
  }, [usersData]);
  
  // Datos para el gráfico de alojamientos preferidos
  const accommodationData = useMemo(() => {
    const accommodations: { [key: string]: number } = {};
    
    usersData.forEach(user => {
      user.preferencias.forEach(pref => {
        if (!accommodations[pref.alojamiento]) {
          accommodations[pref.alojamiento] = 0;
        }
        accommodations[pref.alojamiento]++;
      });
    });
    
    return Object.entries(accommodations).map(([name, value]) => ({ name, value }));
  }, [usersData]);
  
  // Datos para el gráfico de tiempo de viaje preferido
  const travelTimeData = useMemo(() => {
    const travelTimes: { [key: string]: number } = {};
    
    usersData.forEach(user => {
      user.preferencias.forEach(pref => {
        if (!travelTimes[pref.tiempoViaje]) {
          travelTimes[pref.tiempoViaje] = 0;
        }
        travelTimes[pref.tiempoViaje]++;
      });
    });
    
    return Object.entries(travelTimes).map(([name, value]) => ({ name, value }));
  }, [usersData]);
  
  // Datos para el gráfico de rangos de edad preferidos
  const ageRangeData = useMemo(() => {
    const ageRanges: { [key: string]: number } = {};
    
    usersData.forEach(user => {
      user.preferencias.forEach(pref => {
        if (!ageRanges[pref.rangoEdad]) {
          ageRanges[pref.rangoEdad] = 0;
        }
        ageRanges[pref.rangoEdad]++;
      });
    });
    
    return Object.entries(ageRanges).map(([name, value]) => ({ name, value }));
  }, [usersData]);
  
  // Datos para el gráfico de continentes más visitados
  const continentData = useMemo(() => {
    const continents: { [key: string]: number } = {};
    
    usersData.forEach(user => {
      user.destinos.forEach(dest => {
        let continentName;
        switch (dest.continentesId) {
          case 1:
            continentName = "Asia";
            break;
          case 2:
            continentName = "América";
            break;
          case 3:
            continentName = "Europa";
            break;
          default:
            continentName = "Desconocido";
        }
        
        if (!continents[continentName]) {
          continents[continentName] = 0;
        }
        continents[continentName]++;
      });
    });
    
    return Object.entries(continents).map(([name, value]) => ({ name, value }));
  }, [usersData]);
  
  // Datos para el gráfico de países más visitados
  const countryData = useMemo(() => {
    const countries: { [key: string]: number } = {};
    
    usersData.forEach(user => {
      user.destinos.forEach(dest => {
        if (!countries[dest.pais]) {
          countries[dest.pais] = 0;
        }
        countries[dest.pais]++;
      });
    });
    
    return Object.entries(countries)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); // Top 10 países
  }, [usersData]);

  const formatName = (name: string) => {
    return name
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };
  
  return (
    <div>
      <h1 className="statistics-title">Estadísticas de Usuarios, Preferencias y Destinos</h1>
      
      {/* Tarjetas de resumen */}
      <div className="statistics-grid">
        <div className="summary-card">
          <h3 className="summary-title">Total de Usuarios</h3>
          <div className="summary-value">{totalUsers}</div>
          <p className="summary-description">Número total de usuarios registrados en el sistema</p>
        </div>
        
        <div className="summary-card">
          <h3 className="summary-title">Usuarios con Preferencias</h3>
          <div className="summary-value">{usersWithPreferences}</div>
          <p className="summary-description">Usuarios que han definido sus preferencias de viaje ({Math.round((usersWithPreferences / totalUsers) * 100)}%)</p>
        </div>
        
        <div className="summary-card">
          <h3 className="summary-title">Usuarios con Destinos</h3>
          <div className="summary-value">{usersWithDestinations}</div>
          <p className="summary-description">Usuarios que tienen destinos asociados ({Math.round((usersWithDestinations / totalUsers) * 100)}%)</p>
        </div>
        
        <div className="summary-card">
          <h3 className="summary-title">Tipos de Usuario</h3>
          <div className="summary-value">{adminUsers} / {clientUsers}</div>
          <p className="summary-description">Relación entre administradores y clientes</p>
        </div>
      </div>
      
      {/* Sección de gráficas */}
      <div className="statistics-container">
        <h2 className="statistics-title">Distribución de Usuarios</h2>
        
        <div className="statistics-grid">
          <div className="chart-container">
            <h3 className="chart-title">Tipos de Usuario</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Cantidad']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="statistics-container">
        <h2 className="statistics-title">Preferencias de Viaje</h2>
        
        <div className="statistics-grid">
          <div className="chart-container">
            <h3 className="chart-title">Entornos Preferidos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={environmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${formatName(name)}: ${(percent * 100).toFixed(0)}%`}
                >
                  {environmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, formatName(name.toString())]} />
                <Legend formatter={(value) => formatName(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart-container">
            <h3 className="chart-title">Climas Preferidos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={climateData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${formatName(name)}: ${(percent * 100).toFixed(0)}%`}
                >
                  {climateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, formatName(name.toString())]} />
                <Legend formatter={(value) => formatName(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart-container">
            <h3 className="chart-title">Actividades Preferidas</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={activityData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70}
                  tick={{ fontSize: 12 }}
                  tickFormatter={formatName} 
                />
                <YAxis />
                <Tooltip formatter={(value, name, props) => [value, 'Cantidad']} labelFormatter={formatName} />
                <Bar dataKey="value" fill="#8884d8" name="Cantidad" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart-container">
            <h3 className="chart-title">Alojamientos Preferidos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={accommodationData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70}
                  tick={{ fontSize: 12 }}
                  tickFormatter={formatName} 
                />
                <YAxis />
                <Tooltip formatter={(value, name, props) => [value, 'Cantidad']} labelFormatter={formatName} />
                <Bar dataKey="value" fill="#82ca9d" name="Cantidad" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart-container">
            <h3 className="chart-title">Tiempo de Viaje Preferido</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={travelTimeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${formatName(name)}: ${(percent * 100).toFixed(0)}%`}
                >
                  {travelTimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, formatName(name.toString())]} />
                <Legend formatter={(value) => formatName(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart-container">
            <h3 className="chart-title">Rangos de Edad Preferidos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ageRangeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${formatName(name)}: ${(percent * 100).toFixed(0)}%`}
                >
                  {ageRangeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, formatName(name.toString())]} />
                <Legend formatter={(value) => formatName(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="statistics-container">
        <h2 className="statistics-title">Destinos y Continentes</h2>
        
        <div className="statistics-grid">
          <div className="chart-container">
            <h3 className="chart-title">Continentes más Visitados</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={continentData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {continentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Cantidad']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart-container">
            <h3 className="chart-title">Top 10 Países más Visitados</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={countryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip formatter={(value) => [value, 'Cantidad']} />
                <Bar dataKey="value" fill="#ffc658" name="Cantidad" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="statistics-container">
        <h2 className="statistics-title">Detalle de Usuarios</h2>
        
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Tipo</th>
              <th># Preferencias</th>
              <th># Destinos</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>{user.preferencias.length}</td>
                <td>{user.destinos.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 