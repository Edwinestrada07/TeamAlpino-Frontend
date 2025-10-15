import { faChartSimple, faFutbol } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const Statistics = () => {
  const location = useLocation()
  const { sortedPlayers = [] } = location.state || {}
  const [showStats, setShowStats] = useState(false)

  // Calcular jugador destacado
  const findTopPlayer = () => {
    if (sortedPlayers.length === 0) return null

    const sortedByScore = [...sortedPlayers].sort((a, b) => {
      const scoreA = a.rating * 0.5 + a.goals * 2 + a.assists * 1
      const scoreB = b.rating * 0.5 + b.goals * 2 + b.assists * 1
      return scoreB - scoreA
    })

    return sortedByScore[0]
  }

  const topPlayer = findTopPlayer()

  const averageRating =
    sortedPlayers.length > 0
      ? (
          sortedPlayers.reduce((acc, player) => acc + player.rating, 0) /
          sortedPlayers.length
        ).toFixed(2)
      : 0

  return (
    <div className="sm:p-10 min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      {/* Título */}
      <h1 className="text-2xl font-bold text-center text-white mb-6 flex items-center gap-3">
        <FontAwesomeIcon icon={faChartSimple} className="text-green-400 text-2xl" />
        Estadísticas del Partido
      </h1>

      {/* Botón toggle */}
      <button
        onClick={() => setShowStats(!showStats)}
        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300 mb-6"
      >
        {showStats ? 'Ocultar Estadísticas' : 'Ver Estadísticas'}
      </button>

      {/* Contenido */}
      {showStats ? (
        <div className="flex flex-col items-center w-full">
          {/* Tabla de jugadores */}
          <table className="bg-gray-700 m-5 rounded-lg shadow-lg w-full sm:w-3/4 text-white text-sm border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-800">
                <th className="py-2 px-3 text-left">Nombre</th>
                <th className="py-2 px-3 text-center">Calificación</th>
                <th className="py-2 px-3 text-center">Goles</th>
                <th className="py-2 px-3 text-center">Asistencias</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((player, index) => (
                <tr key={index} className="hover:bg-gray-600">
                  <td className="py-2 px-3">{player.name}</td>
                  <td className="py-2 px-3 text-center">{player.rating}</td>
                  <td className="py-2 px-3 text-center">{player.goals}</td>
                  <td className="py-2 px-3 text-center">{player.assists}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Gráficos */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-10 mt-10 w-full sm:w-3/4">
            {/* Calificaciones */}
            <div className="w-full sm:w-1/2">
              <h2 className="text-lg text-center text-white font-semibold mb-4">
                Calificaciones de Jugadores
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sortedPlayers}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rating" fill="#8884d8" barSize={35} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Promedio */}
            <div className="w-full sm:w-1/2">
              <h2 className="text-lg text-center text-white font-semibold mb-4">
                Calificación Promedio del Partido
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[{ name: 'Promedio', rating: parseFloat(averageRating) }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Bar dataKey="rating" fill="#82ca9d" barSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Jugador destacado */}
          {topPlayer && (
            <div className="mt-10 bg-green-600 text-white text-center p-5 rounded-lg shadow-lg animate-pulse max-w-lg">
              <h2 className="text-xl font-bold mb-2">🏆 Jugador Destacado</h2>
              <p className="text-sm sm:text-base">
                <strong>{topPlayer.name}</strong> fue el jugador destacado con una calificación de{' '}
                <strong>{topPlayer.rating}</strong> estrellas, {topPlayer.goals} goles y{' '}
                {topPlayer.assists} asistencias.
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-white text-lg mt-4">
          Estadísticas ocultas <FontAwesomeIcon icon={faFutbol} spin className="ml-2 text-green-400" />
        </p>
      )}
    </div>
  )
}

export default Statistics
