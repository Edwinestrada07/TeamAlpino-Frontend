import { faHand } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

const PersonForm = ({ addPerson, persons, clearPlayers }) => {
    const [name, setName] = useState('')
    const [cellNumber, setCellNumber] = useState('')
    const [isArcher, setIsArcher] = useState(false)
    const [error, setError] = useState('')
    const [daysLeft, setDaysLeft] = useState(0)
    const [consecutive, setConsecutive] = useState(26)
    const [nextGameDate, setNextGameDate] = useState('')

    useEffect(() => {
        const getNextWednesday = () => {
            const today = new Date()
            const dayOfWeek = today.getDay()
            const daysUntilNextWednesday = (3 - dayOfWeek + 7) % 7
            const nextWednesday = new Date(today)
            nextWednesday.setDate(today.getDate() + daysUntilNextWednesday)
            return nextWednesday
        }

        const updateGameInfo = () => {
            const nextGame = getNextWednesday()
            const daysLeft = Math.ceil((nextGame - new Date()) / (1000 * 60 * 60 * 24))
            setDaysLeft(daysLeft)
            setNextGameDate(nextGame.toDateString())

            // Convert the date to Spanish format
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            const spanishDate = nextGame.toLocaleDateString('es-ES', options)
            setNextGameDate(spanishDate)
        }

        updateGameInfo()

        const checkAndClearPlayers = () => {
            const today = new Date()
            if (today.getDay() === 4) { // 4 representa el jueves
                clearPlayers()
            }
        }
        
        const interval = setInterval(updateGameInfo, 24 * 60 * 60 * 1000); // Actualizar cada dí

        // Initial check
        checkAndClearPlayers()
        
        return () => clearInterval(interval)
    }, [clearPlayers])

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
            setConsecutive(consecutive + 1)
        }
    }

    return (
        <div className="flex justify-center items-center p-6 bg-gray-900 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-100">
                {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digita tu nombre"
                    className="bg-gray-700 text-white p-3 mb-3 rounded border-none outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <input
                    type="number"
                    value={cellNumber}
                    onChange={(e) => setCellNumber(e.target.value)}
                    placeholder="Número celular"
                    className="bg-gray-700 text-white p-3 mb-3 rounded border-none outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <label className="flex items-center mb-3 text-white">
                    <input
                        type="checkbox"
                        checked={isArcher}
                        onChange={(e) => setIsArcher(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-blue-500 bg-gray-700 border-none rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2"><FontAwesomeIcon icon={faHand} />¿Eres Arquero?</span>
                </label>
                <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition-colors duration-300">
                    Agregar
                </button>
                <div className="mt-4 text-white">
                    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg text-lg font-bold">
                        <h2>Próximo Partido</h2>
                        <p>Fecha: {nextGameDate}</p>
                        <p>Hora: 8:30 PM</p>
                        <p>Ubicación: Cancha La Patria</p>
                        <p>Número del partido: #{consecutive}</p>
                        <p>Faltan {daysLeft} días</p>
                    </div>
                </div>
            </form>
        </div>
    ) 
}

export default PersonForm
