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

    // Función para determinar el jugador destacado
    const findTopPlayer = () => {
        if (sortedPlayers.length === 0) {
            return null
        }

        // Ordenar jugadores por puntuación combinada de mayor a menor
        const sortedByScore = [...sortedPlayers].sort((a, b) => {
            // Ejemplo: Suma ponderada de calificación, goles y asistencias
            const scoreA = a.rating * 0.5 + a.goals * 2 + a.assists * 1
            const scoreB = b.rating * 0.5 + b.goals * 2 + b.assists * 1
            return scoreB - scoreA // Orden descendente
        })

        // El primer jugador en la lista ordenada es el jugador destacado
        return sortedByScore[0]
    }

    const topPlayer = findTopPlayer()

    const averageRating = sortedPlayers.length > 0
        ? sortedPlayers.reduce((acc, player) => acc + player.rating, 0) / sortedPlayers.length
        : 0

    return (
        <div className="p-1 sm:p-6 min-h-screen bg-gray-900 flex flex-col items-center justify-center">
            <h1 className="text-xl sm:text-2xl font-bold text-center text-white mb-4">
                <FontAwesomeIcon icon={faChartSimple} className="mr-2" /> Estadísticas del partido
            </h1>
            <button
                onClick={() => setShowStats(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 mb-4 sm:mb-6 text-sm sm:text-base"
            >
                Ver Estadísticas
            </button>
        
            {showStats ? (
                <div className="flex flex-col items-center w-full">
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                        <table className="bg-gray-600 rounded-lg m-4 shadow-lg w-full sm:w-3/4 text-white text-xs sm:text-sm border-separate border-spacing-1 border border-slate-200">
                            <thead>
                                <tr>
                                    <th className="border-b border-gray-700 py-1 px-2 text-left">Nombre</th>
                                    <th className="border-b border-gray-700 py-1 px-2 text-left">Califi</th>
                                    <th className="border-b border-gray-700 py-1 px-2 text-left">Goles</th>
                                    <th className="border-b border-gray-700 py-1 px-2 text-left">Asist</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedPlayers.map((player, index) => (
                                    <tr key={index}>
                                        <td className="border-b border-gray-800 py-1 px-2">{player.name}</td>
                                        <td className="border-b border-gray-800 py-1 px-5">{player.rating}</td>
                                        <td className="border-b border-gray-800 py-1 px-5">{player.goals}</td>
                                        <td className="border-b border-gray-800 py-1 px-5">{player.attendance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
        
                        <div className="flex flex-col items-center w-full sm:w-3/4">
                            <div className="w-full mb-4 sm:mb-6">
                                <h2 className="text-lg sm:text-xl text-white font-bold m-5 sm:mb-4 text-center">Calificaciones de Jugadores</h2>
                                <ResponsiveContainer width="100%" height={260}>
                                    <BarChart data={sortedPlayers}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="rating" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
        
                            <div className="w-full mb-4">
                                <h2 className="text-lg sm:text-xl text-white font-bold m-5 sm:mb-4 text-center">Calificación del Partido</h2>
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={[{ name: 'Promedio', rating: averageRating }]}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="rating" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
        
                    {topPlayer && (
                        <div className="mt-4 sm:mt-6 bg-green-600 text-white text-center p-4 rounded-lg shadow-lg animate-bounce-slow">
                            <h2 className="text-lg sm:text-xl font-bold mb-2">Jugador Destacado</h2>
                            <p className="text-xs sm:text-base">{topPlayer.name} fue el jugador destacado con una calificación de {topPlayer.rating} estrellas, {topPlayer.goals} goles y {topPlayer.attendance} asistencias.</p>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-white text-sm sm:text-lg">Cargando... <FontAwesomeIcon icon={faFutbol} spin /></p>
            )}
        </div>
    )    
}

export default Statistics

