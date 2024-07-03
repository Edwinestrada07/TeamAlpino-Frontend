import { useState } from 'react';

const UserProfile = () => {
    const [searchName, setSearchName] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUserData = async (name) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/user/${name}`);
            if (!response.ok) {
                throw new Error('Usuario no encontrado');
            }
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (searchName) {
            fetchUserData(searchName);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Buscar Jugador</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        placeholder="Ingrese el nombre del jugador"
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white p-2 rounded ml-2"
                    >
                        Buscar
                    </button>
                </div>

                {loading && <p>Cargando...</p>}

                {user && !loading && (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
                        <p><strong>Número Celular:</strong> {user.cell_number}</p>
                        <p><strong>Portero:</strong> {user.is_archer ? 'Sí' : 'No'}</p>
                        <p><strong>Rating:</strong> {user.rating}</p>
                        <p><strong>Posición Preferida:</strong> {user.positions}</p>
                        <p><strong>Goles anotados:</strong> {user.goals}</p>
                        <p><strong>Asistencias:</strong> {user.attendance}</p>
                        
                        <h2 className="text-xl font-bold mt-6 mb-2">Historial de Juegos</h2>
                        {user.matches && user.matches.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {user.matches.map((match, index) => (
                                    <li key={index}>
                                        <p><strong>Fecha:</strong> {match.date}</p>
                                        <p><strong>Goles anotados:</strong> {match.goals}</p>
                                        <p><strong>Asistencias:</strong> {match.attendance}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay coincidencias disponibles.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
