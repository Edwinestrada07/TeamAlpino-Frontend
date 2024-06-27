import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHand, faShirt } from '@fortawesome/free-solid-svg-icons'
import UserRating from './UserRating'

const Groups = ({ groups }) => {
    const [rated, setRated] = useState(false)

    const handleRated = () => {
        setRated(!rated) // Forzar actualización después de calificar
    }

    return (
        <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-900 rounded-lg shadow-lg">
                <div>
                    <h2 className="text-xl font-bold text-center text-white">Equipo 1</h2>
                    <p className="text-xl font-bold text-center text-white p-2">
                        <FontAwesomeIcon icon={faShirt} /> Camiseta Blanca / Medias Blancas
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                        {groups.group1.map((person, index) => (
                            <div key={index} className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
                                <div className="flex justify-between items-center">
                                    <span>{person.name}</span>
                                    {person.is_archer && <FontAwesomeIcon icon={faHand} className="text-blue-500 mr-40" />}
                                    <UserRating userId={person.id} initialRating={person.rating || 0} onRated={handleRated} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-center text-white">Equipo 2</h2>
                    <p className="text-xl font-bold text-center text-white p-2">
                        <FontAwesomeIcon icon={faShirt} /> Camiseta Negra / Medias Negras
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                        {groups.group2.map((person, index) => (
                            <div key={index} className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
                                <div className="flex justify-between items-center">
                                    <span>{person.name}</span>
                                    {person.is_archer && <FontAwesomeIcon icon={faHand} className="text-blue-500 mr-40" />}
                                    <UserRating userId={person.id} initialRating={person.rating || 0} onRated={handleRated} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Groups
