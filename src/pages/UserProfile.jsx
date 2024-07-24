import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react'

const UserProfile = () => {
    const [searchName, setSearchName] = useState('')
    const [user, setUser] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchUserData = async (name) => {
        setLoading(true)
        try {
            const response = await fetch(`https://teamalpino-backend.onrender.com/user/${name}`)
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
        <div className="flex-1 flex flex-col justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-10 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center text-white mb-6">Buscar Jugador</h1>
                <div className="mb-4 flex">
                    <input
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        placeholder="Ingrese Nombre"
                        className="bg-gray-700 text-white p-2 rounded border-none outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 mb-2 ml-2"
                    >
                        Buscar
                    </button>
                </div>
    
                {loading && <p className="text-white text-lg">Cargando... <FontAwesomeIcon icon={faFutbol} spin /></p>}
                {error && <div className="bg-red-500 text-white p-2 rounded m-3">{error}</div>}

                {user && !loading && (
                    <div>
                        <h1 className="text-2xl mb-4 text-white font-medium">{user.name}</h1>
                        <p className="text-white"><strong>Número Celular:</strong> {user.cell_number}</p>
                        <p className="text-white"><strong>Portero:</strong> {user.is_archer ? 'Sí' : 'No'}</p>
                        <p className="text-white"><strong>Calificación:</strong> {user.rating}</p>
                        <p className="text-white"><strong>Posición Preferida:</strong> {user.positions}</p>
                        <p className="text-white"><strong>Goles anotados:</strong> {user.goals}</p>
                        <p className="text-white"><strong>Asistencias:</strong> {user.attendance}</p>
                    </div>
                )}
            </div>
        </div>
    );
    
};

export default UserProfile;
