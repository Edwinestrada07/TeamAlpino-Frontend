import { useState } from "react"

const PersonList = ({ persons, deletePerson, updatePerson }) => {
    const [editingId, setEditingId] = useState(null)
    const [updateName, setUpdateName] = useState('')
    const [updateCellNumber, setUpdateCellNumber] = useState('')

    //controlador de eventos clic
    const handleUpdate = (person) => {
        setEditingId(person.id)
        setUpdateName(person.name)
        setUpdateCellNumber(person.cell_number)
    }

    const handleSave = (id) => {
        updatePerson(id, { name: updateName, cell_number: updateCellNumber })
        setEditingId(null)
    }


    return (
        <ul className="mb-4">
            {persons.map((person) => (
                <li key={`${person.name}-${person.cell_number}`} className="border p-2 mb-2 flex justify-between items-center">
                    {editingId === person.id ? (
                        <>
                            <input
                                type="text"
                                value={updateName}
                                onChange={(e) => setUpdateName(e.target.value)}
                                className="border p-2 mr-2"
                            />
                            <input
                                type="number"
                                value={updateCellNumber}
                                onChange={(e) => setUpdateCellNumber(e.target.value)}
                                className="border p-2 mr-2"
                            />
                            <button onClick={() => handleSave(person.id)} className="bg-blue-500 text-white p-2 rounded mr-2">
                                Guardar
                            </button>
                            <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white p-2 rounded">
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <span>{person.name} - {person.cell_number} - {person.status}</span>
                            <div>
                                <button onClick={() => handleUpdate(person)} className="bg-yellow-500 text-white p-2 rounded mr-2">
                                    Editar
                                </button>
                                <button onClick={() => deletePerson(person.id)} className="bg-red-500 text-white p-2 rounded">
                                    Eliminar
                                </button>   
                            </div>
                        </>            
                    )}
                </li>
            ))}
        </ul>
    )
}

export default PersonList



