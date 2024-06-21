import { faHand, faPen, faTrash, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

const PersonList = ({ persons, deletePerson, updatePerson }) => {
    const [editingId, setEditingId] = useState(null)
    const [updateName, setUpdateName] = useState('')
    const [updateCellNumber, setUpdateCellNumber] = useState('')
    const [updateIsArcher, setUpdateIsArcher] = useState(false)
    const [error, setError] = useState('')

    //controlador de eventos clic
    const handleUpdate = (person) => {
        setEditingId(person.id)
        setUpdateName(person.name)
        setUpdateCellNumber(person.cell_number)
        setUpdateIsArcher(person.is_archer)
    }

    const handleSave = (id) => {
        const archerCount = persons.filter(person => person.is_archer && person.id !== id).length

        if (updateIsArcher && archerCount >= 2) {
            setError('Ya hay dos arqueros registrados.')
            return
        }

        updatePerson(id, { name: updateName, cell_number: updateCellNumber, is_archer: updateIsArcher })
        setEditingId(null)
        setError('')
    }

    return (
        <div className="flex justify-center items-center p-4 bg-gray-900 rounded-lg shadow-lg ">            
            <ul className="grid grid-cols-1 md:grid-cols-5 gap-2 p-3 bg-gray-600 rounded-lg shadow-lg w-11/12 md:w-3/1">
                {persons.map((person) => (
                    <li key={`${person.name}-${person.cell_number}`} className="bg-gray-700 text-white p-2 rounded shadow-lg flex flex-col justify-between">
                        {editingId === person.id ? (
                            <>
                                <input
                                    type="text"
                                    value={updateName}
                                    onChange={(e) => setUpdateName(e.target.value)}
                                    className="bg-gray-600 text-white p-3 mb-3 rounded border-none outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="number"
                                    value={updateCellNumber}
                                    onChange={(e) => setUpdateCellNumber(e.target.value)}
                                    className="bg-gray-600 text-white p-3 mb-3 rounded border-none outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <label className="flex items-center mb-3 text-white">
                                    <input
                                        type="checkbox"
                                        checked={updateIsArcher}
                                        onChange={(e) => setUpdateIsArcher(e.target.checked)}
                                        className="form-checkbox h-5 w-5 text-blue-500 bg-gray-600 border-none rounded focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="ml-2"><FontAwesomeIcon icon={faHand} />Arquero</span>
                                </label>
                                {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
                                <div className="flex justify-between">
                                    <button onClick={() => handleSave(person.id)} className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 mr-2 w-1/2">
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                    <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 w-1/2">
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <span className="mb-3">{person.name} - {person.cell_number}</span>
                                <div className="flex justify-between">
                                    <button onClick={() => handleUpdate(person)} className="bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition-colors duration-300 mr-1 w-1/2">
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                    <button onClick={() => deletePerson(person.id)} className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors duration-300 w-1/2">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>   
                                </div>
                            </>            
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
    
}

export default PersonList



