import { useState } from "react"

const PersonForm = ({ addPerson }) => {
    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault() //es una llamada que previene el comportamiento predeterminado del formulario de HTML (se llama para evitar que el formulario recargue la página)
        if (name) {
            addPerson(name) //Si name no está vacío, se llama a la función addPerson con el nombre proporcionado. addPerson es una función asíncrona
            setName('') //reiniciar el campo de entrada del nombre
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa tu nombre"
                className="border p-2 mr-2" 
            />
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
                Agregar
            </button>
        </form>
    )
}

export default PersonForm