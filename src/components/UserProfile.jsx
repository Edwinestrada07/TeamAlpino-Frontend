import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const {name} = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data from the server
        const userData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/${name}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        userData();
    }, [name]);

    

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
                <p><strong>Número Celular:</strong> {user.cell_number}</p>
                <p><strong>Portero:</strong> {user.is_archer ? 'Yes' : 'No'}</p>
                <p><strong>Rating:</strong> {user.rating}</p>
                <p><strong>Posición Preferida:</strong> {user.preferred_positions}</p>
                <h2 className="text-xl font-bold mt-6 mb-2">Historial de Juegos</h2>
                {user.matches && user.matches.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {user.matches.map((match, index) => (
                            <li key={index}>
                                <p><strong>Fecha:</strong> {match.date}</p>
                                <p><strong>Goles anotados:</strong> {match.goals}</p>
                                <p><strong>Asistencias:</strong> {match.assists}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay coincidencias disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
