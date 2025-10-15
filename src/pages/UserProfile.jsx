import { faFutbol } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const UserProfile = () => {
    const [searchName, setSearchName] = useState('')
    const [user, setUser] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchUserData = async (name) => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/user/${name}`)
            if (!response.ok) {
                setError('Jugador no encontrado, verifica la información.')
                setTimeout(() => setError(''), 2000)
            }
            const data = await response.json()
            setUser(data)
        } catch (error) {
            console.error('Error fetching user data:', error)
            setUser(null)
        } finally {
            setTimeout(() => setLoading(false), 2000) 
        }
    }

    const handleSearch = () => {
        if (searchName) {
            fetchUserData(searchName)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md">
                {/* Título */}
                <h1 className="text-3xl font-bold text-center text-white mb-6">
                    Buscar Jugador
                </h1>

                {/* Buscador */}
                <div className="flex flex-col sm:flex-row items-center mb-6 gap-3">
                    <input
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        placeholder="Ingrese nombre del jugador"
                        className="flex-1 bg-gray-700 text-white p-3 rounded-lg outline-none border-none focus:ring-2 focus:ring-blue-500 w-full transition-all"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                        <FontAwesomeIcon icon={faFutbol} />
                        Buscar
                    </button>
                </div>

                {/* Estado de carga */}
                {loading && (
                    <div className="flex justify-center text-blue-400 text-lg font-medium mb-4">
                        <FontAwesomeIcon icon={faFutbol} spin className="mr-2" />
                        Cargando jugador...
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="bg-red-600 text-white p-3 rounded-lg mb-4 text-center shadow-md">
                        {error}
                    </div>
                )}

                {/* Resultados */}
                {user && !loading && (
                    <div className="bg-gray-700 rounded-lg p-5 shadow-inner text-white animate-fadeIn">
                        <h2 className="text-2xl font-semibold mb-3 border-b border-gray-600 pb-2 text-center">
                            {user.name}
                        </h2>
                        <div className="space-y-2 text-sm sm:text-base">
                            <p>
                                <strong className="text-blue-400">📱 Número Celular:</strong>{" "}
                                {user.cell_number}
                            </p>
                            <p>
                                <strong className="text-blue-400">🧤 Portero:</strong>{" "}
                                {user.is_archer ? "Sí" : "No"}
                            </p>
                            <p>
                                <strong className="text-blue-400">⭐ Calificación:</strong>{" "}
                                {user.rating}
                            </p>
                            <p>
                                <strong className="text-blue-400">⚽ Posición:</strong>{" "}
                                {user.positions}
                            </p>
                            <p>
                                <strong className="text-blue-400">🥅 Goles anotados:</strong>{" "}
                                {user.goals}
                            </p>
                            <p>
                                <strong className="text-blue-400">🎯 Asistencias:</strong>{" "}
                                {user.attendance}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserProfile
