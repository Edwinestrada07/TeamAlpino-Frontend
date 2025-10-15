import { faHand, faPen, faTrash, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

const PersonList = ({ persons, deletePerson, updatePerson }) => {
    const [editingId, setEditingId] = useState(null)
    const [updateName, setUpdateName] = useState('')
    const [updateCellNumber, setUpdateCellNumber] = useState('')
    const [updatePositions, setUpdatePositions] = useState('')
    const [updateIsArcher, setUpdateIsArcher] = useState(false)
    const [error, setError] = useState('')

    //controlador de eventos clic
    const handleUpdate = (person) => {
        setEditingId(person.id)
        setUpdateName(person.name)
        setUpdateCellNumber(person.cell_number)
        setUpdatePositions(person.positions)
        setUpdateIsArcher(person.is_archer)
    }

    const handleSave = (id) => {
        const archerCount = persons.filter(person => person.is_archer && person.id !== id).length

        if (updateIsArcher && archerCount >= 2) {
            setError('Ya hay dos arqueros registrados.')
            return
        }

        updatePerson(id, { name: updateName, cell_number: updateCellNumber,  positions: updatePositions, is_archer: updateIsArcher })
        setEditingId(null)
        setError('')
    }

    return (
        <div className="flex justify-center items-center bg-gray-90 p-4">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full max-w-7xl bg-gray-800 p-5 rounded-2xl shadow-2xl">
                {persons.map((person, index) => (
                    <li
                        key={person.id || index}
                        className="bg-gray-700 text-white p-4 rounded-xl shadow-lg flex flex-col justify-between transition-transform transform hover:scale-[1.02] duration-200"
                        >
                        {editingId === person.id ? (
                            <>
                            {/* Inputs de edición */}
                            <div className="flex flex-col gap-2 mb-3">
                                <input
                                    type="text"
                                    value={updateName}
                                    onChange={(e) => setUpdateName(e.target.value)}
                                    placeholder="Nombre"
                                    className="bg-gray-600 text-white px-3 py-2 rounded-lg border-none outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="number"
                                    value={updateCellNumber}
                                    onChange={(e) => setUpdateCellNumber(e.target.value)}
                                    placeholder="Celular"
                                    className="bg-gray-600 text-white px-3 py-2 rounded-lg border-none outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    value={updatePositions}
                                    onChange={(e) => setUpdatePositions(e.target.value)}
                                    placeholder="Posición"
                                    className="bg-gray-600 text-white px-3 py-2 rounded-lg border-none outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <label className="flex items-center gap-2 mt-1 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={updateIsArcher}
                                        onChange={(e) => setUpdateIsArcher(e.target.checked)}
                                        className="form-checkbox h-4 w-4 text-blue-500 bg-gray-700 border-none rounded focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="flex items-center gap-1">
                                        <FontAwesomeIcon icon={faHand} />
                                        Arquero
                                    </span>
                                </label>
                            </div>

                            {/* Mensaje de error */}
                            {error && (
                                <div className="bg-red-600 text-white p-2 rounded-lg mb-3 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            {/* Botones de acción */}
                            <div className="flex flex-col sm:flex-row justify-between gap-2">
                                <button
                                    onClick={() => handleSave(person.id)}
                                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex justify-center items-center gap-2"
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                    Guardar
                                </button>
                                <button
                                    onClick={() => setEditingId(null)}
                                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300 flex justify-center items-center gap-2"
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                    Cancelar
                                </button>
                            </div>
                            </>
                        ) : (
                            <>
                                {/* Vista normal */}
                                <div className="flex flex-col mb-3">
                                    <span className="text-lg font-semibold">{person.name}</span>
                                    <span className="text-sm text-gray-300">
                                    {person.cell_number} — {person.positions}
                                    </span>
                                </div>

                                {/* Botones */}
                                <div className="flex flex-col sm:flex-row justify-between gap-2">
                                    <button
                                        onClick={() => handleUpdate(person)}
                                        className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300 flex justify-center items-center gap-2"
                                    >
                                        <FontAwesomeIcon icon={faPen} />
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deletePerson(person.id)}
                                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-300 flex justify-center items-center gap-2"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                        Eliminar
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );  
}

export default PersonList