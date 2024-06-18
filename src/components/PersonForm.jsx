import { useState } from "react"

const PersonForm = ({ addPerson }) => {
    const [name, setName] = useState('')
    const [cellNumber, setCellNumber] = useState('')
    const [isArcher, setIsArcher] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault() // Previene el comportamiento predeterminado del formulario de HTML (evita que el formulario recargue la página)
        if (name && cellNumber) {
            addPerson({ name, cell_number: cellNumber, is_archer: isArcher }) // Si name y cellNumber no están vacíos, llama a la función addPerson con el nombre y el número proporcionados
            setName('')
            setCellNumber('') // Reinicia el campo de entrada del número de celular
            setIsArcher(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4">
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
                <span>¿Eres Arquero?</span>
            </label>
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
                Agregar
            </button>
        </form>
    )
}

export default PersonForm
