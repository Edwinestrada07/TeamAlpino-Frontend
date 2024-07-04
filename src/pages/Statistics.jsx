import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom'
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

    const averageRating = sortedPlayers.length > 0
        ? sortedPlayers.reduce((acc, player) => acc + player.rating, 0) / sortedPlayers.length
        : 0

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center text-white mb-2">
                <FontAwesomeIcon icon={faChartSimple} className="mr-2" /> Estadísticas del partido
            </h1>
            {sortedPlayers.length > 0 ? (
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <table className="bg-gray-700 rounded-lg shadow-lg w-full md:w-1/2 mt-4 text-white text-center border-separate border-spacing-1 border border-slate-400">
                        <thead>
                            <tr>
                                <th className="border border-slate-400 px-5 py-2">Nombre Jugador</th>
                                <th className="border border-slate-400 px-5 py-2">Calificación de mayor a menor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedPlayers.map((player, index) => (
                                <tr key={index}>
                                    <td className="border border-slate-500">{player.name}</td>
                                    <td className="border border-slate-500">{player.rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-4">
                        <h2 className="text-xl text-white font-bold mb-4 text-center mt-5">Calificaciones de Jugadores</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={sortedPlayers}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="rating" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>

                        <h2 className="text-xl text-white font-bold mt-8 mb-4 text-center">Calificación Promedio del Partido {averageRating.toFixed(2)}</h2>
                        <ResponsiveContainer width="100%" height={300}>
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
            ) : (
                <p className="flex-grow sm:pr-16 text-2xl font-medium title-font text-white p-4">No hay calificaciones disponibles.</p>
            )}
        </div>
    )
}

export default Statistics



