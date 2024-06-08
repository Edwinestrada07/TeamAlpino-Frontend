import { useState } from "react"

const PersonForm = ({ addPerson }) => {
    const [name, setName] = useState('')
    const [cellNumber, setCellNumber] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault() //es una llamada que previene el comportamiento predeterminado del formulario de HTML (se llama para evitar que el formulario recargue la página)
        if (name && cellNumber) {
            addPerson({ name, cell_number: cellNumber }) //Si name y cellNumber no está vacío, se llama a la función addPerson con el nombre proporcionado. addPerson es una función asíncrona
            setName('')
            setCellNumber //reiniciar el campo de entrada del nombre
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
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
                Agregar
            </button>
        </form>
      )
}

export default PersonForm