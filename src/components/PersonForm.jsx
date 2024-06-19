import { faHand } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

const PersonForm = ({ addPerson, persons }) => {
    const [name, setName] = useState('')
    const [cellNumber, setCellNumber] = useState('')
    const [isArcher, setIsArcher] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault() // Previene el comportamiento predeterminado del formulario de HTML (evita que el formulario recargue la página)

        const totalPersons = persons.length
        const archerCount = persons.filter(person => person.is_archer).length

        if (totalPersons >= 14) {
            setError('Ya se ha excedido el número de jugadores')
            return
        }

        if(isArcher && archerCount >= 2) {
            setError('Ya hay dos arqueros registrados, debe modificar uno')
            return
        }

        if(!isArcher && (totalPersons - archerCount) >= 12) {
            setError('Ya se ha excedido el número de jugadores')
            return
        }

        if (name && cellNumber) {
            addPerson({ name, cell_number: cellNumber, is_archer: isArcher })
            setName('')
            setCellNumber('')
            setIsArcher(false)
            setError('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}

            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digita tu nombre"
                className="border p-2 mr-2"
            />
            <input
                type="number"
                value={cellNumber}
                onChange={(e) => setCellNumber(e.target.value)}
                placeholder="Número celular"
                className="border p-2 mr-2"
            />
            <label className="mr-2">
                <input
                    type="checkbox"
                    checked={isArcher}
                    onChange={(e) => setIsArcher(e.target.checked)}
                />
                <span> <FontAwesomeIcon icon={faHand} />¿Eres Arquero?</span>
            </label>
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
                Agregar
            </button>
        </form>
    )
}

export default PersonForm
