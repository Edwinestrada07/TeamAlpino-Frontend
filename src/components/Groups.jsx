import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHand, faShirt, faTimes } from '@fortawesome/free-solid-svg-icons'
import UserRating from './UserRating'

const Groups = ({ groups }) => {
    const [rated, setRated] = useState(false)
    const [showPanel, setShowPanel] = useState(false)

    const handleRated = () => {
        setRated(!rated) // Forzar actualización después de calificar
    }

    const handleGenerateGroups = () => {
        // Aquí iría la lógica para generar grupos
        setShowPanel(true)
    }

    const handleClosePanel = () => {
        setShowPanel(false)
    }

    return (
        <div className="relative mt-8">
            <button onClick={handleGenerateGroups} className="mb-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Ver equipos
            </button>
            {showPanel && (
                <div className="fixed top-0 right-0 w-full md:w-2/3 h-full bg-gray-500 p-4 rounded-lg shadow-lg overflow-y-auto transition-transform transform translate-x-full animate-slide-in-slow z-50">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white">Califica el Partido</h2>
                        <button onClick={handleClosePanel}>
                            <FontAwesomeIcon icon={faTimes} className="bg-red-500 p-1 text-white rounded"/>
                        </button>
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-center text-white">Equipo 1</h3>
                            <p className="text-xl font-bold text-center text-white p-2">
                                <FontAwesomeIcon icon={faShirt} /> Camiseta Blanca / Medias Blancas
                            </p>
                            <div className="grid grid-cols-1 gap-4">
                                {groups.group1.map((person, index) => (
                                    <div key={index} className="bg-gray-800 text-white p-3 rounded-lg shadow-md">
                                        <div className="flex justify-between items-center">
                                            <span className="truncate">{person.name}</span>
                                            {person.is_archer && <FontAwesomeIcon icon={faHand} className="text-blue-500 mr-40" />}
                                            <UserRating userId={person.id} initialRating={person.rating || 0} onRated={handleRated} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-center text-back">Equipo 2</h3>
                            <p className="text-xl font-bold text-center text-black p-2">
                                <FontAwesomeIcon icon={faShirt} /> Camiseta Negra / Medias Negras
                            </p>
                            <div className="grid grid-cols-1 gap-4">
                                {groups.group2.map((person, index) => (
                                    <div key={index} className="bg-gray-800 text-white p-3 rounded-lg shadow-md">
                                        <div className="flex justify-between items-center">
                                            <span className="truncate">{person.name}</span>
                                            {person.is_archer && <FontAwesomeIcon icon={faHand} className="text-blue-500 mr-40" />}
                                            <UserRating userId={person.id} initialRating={person.rating || 0} onRated={handleRated} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Groups

