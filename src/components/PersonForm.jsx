import { faHand, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import Groups from "./Groups"
import PersonList from "./PersonList"

const authorizedNumbers = ['123', '456'] // Lista de números autorizados para generar equipos (reemplazar con números reales)

const PersonForm = ({ addPerson, persons, deletePerson, updatePerson }) => {
    // Estados locales para el formulario y gestión de datos
    const [name, setName] = useState('')
    const [cellNumber, setCellNumber] = useState('')
    const [isArcher, setIsArcher] = useState(false)
    const [error, setError] = useState('')
    const [daysLeft, setDaysLeft] = useState(0)
    const [consecutive, setConsecutive] = useState(26)
    const [nextGameDate, setNextGameDate] = useState('')

    // Estados para la gestión de grupos y visualización de jugadores
    const [showPlayers, setShowPlayers] = useState(false)
    const [groups, setGroups] = useState({ group1: [], group2: [] })
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [userCellNumber, setUserCellNumber] = useState('')
    const [showVerificationInput, setShowVerificationInput] = useState(false)

    // Efecto para calcular la fecha del próximo partido y actualizarla diariamente
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

            // Convertir la fecha al formato español
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            const spanishDate = nextGame.toLocaleDateString('es-ES', options)
            setNextGameDate(spanishDate)
        }

        updateGameInfo()
        const interval = setInterval(updateGameInfo, 24 * 60 * 60 * 1000) // Actualizar cada día
        return () => clearInterval(interval) // Limpiar el intervalo al desmontar el componente
    }, [])

    // Función para manejar la presentación del formulario
    const handleSubmit = (e) => {
        e.preventDefault()

        const totalPersons = persons.length
        const archerCount = persons.filter(person => person.is_archer).length

        // Validaciones antes de agregar una nueva persona
        if (totalPersons >= 14) {
            setError('Ya se ha excedido el número máximo de jugadores.')
            return
        }

        if (isArcher && archerCount >= 2) {
            setError('Ya hay dos arqueros registrados. Debe modificar uno.')
            return
        }

        if (!isArcher && (totalPersons - archerCount) >= 12) {
            setError('Ya se ha excedido el número máximo de jugadores.')
            return
        }

        // Si los campos están completos, agregar persona y reiniciar estados
        if (name && cellNumber) {
            addPerson({ name, cell_number: cellNumber, is_archer: isArcher })
            setName('')
            setCellNumber('')
            setIsArcher(false)
            setError('')
            setConsecutive(consecutive + 1)
            setSuccessMessage('Jugador registrado con éxito')
            setTimeout(() => setSuccessMessage(''), 3000) // Ocultar mensaje de éxito después de 3 segundos
        } else {
            setError('Por favor, complete todos los campos.')
        }
    }

    // Función para eliminar una persona por su ID
    const handleDeletePerson = async (id) => {
        try {
            await fetch(`http://localhost:3000/user/${id}`, {
                method: 'DELETE',
            })
            // Llamar a la función deletePerson que está pasada como prop
            deletePerson(id)
            setSuccessMessage('Jugador eliminado con éxito')
            setTimeout(() => setSuccessMessage(''), 3000) // Ocultar mensaje de éxito después de 3 segundos
        } catch (error) {
            setError('Error al eliminar la persona.')
        }
    }

    // Función para actualizar los datos de una persona por su ID
    const handleUpdatePerson = async (id, updatedPerson) => {
        try {
            const response = await fetch(`http://localhost:3000/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPerson)
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Error al actualizar el usuario.')
            }

            const data = await response.json()
            // Actualizar personas usando la función updatePerson pasada como prop
            updatePerson(id, data)
            setError('')
            setSuccessMessage('Jugador actualizado con éxito')
            setTimeout(() => setSuccessMessage(''), 3000) // Ocultar mensaje de éxito después de 3 segundos
        } catch (error) {
            setError(error.message)
        }
    }

    // Función para generar grupos aleatorios
    const generateGroups = () => {
        if (!authorizedNumbers.includes(userCellNumber)) {
            setError('El número de celular proporcionado no tiene permisos para generar equipos.')
            return
        }

        setIsLoading(true)
        setSuccessMessage('')
        setTimeout(() => {
            const shuffled = [...persons].sort(() => 0.5 - Math.random())
            const arqueros = shuffled.filter(person => person.is_archer)
            const otherPlayers = shuffled.filter(person => !person.is_archer)

            if (arqueros.length < 2) {
                setError('Debe haber al menos dos arqueros registrados para generar equipos.')
                setIsLoading(false)
                return
            }

            const group1 = [arqueros[0], ...otherPlayers.slice(0, 6)]
            const group2 = [arqueros[1], ...otherPlayers.slice(6, 12)]

            setGroups({ group1, group2 })
            setError('')
            setShowPlayers(false)
            setIsLoading(false)
            setSuccessMessage('Equipos generados con éxito')
            setTimeout(() => setSuccessMessage(''), 3000) // Ocultar mensaje de éxito después de 3 segundos
        }, 2000) // Simular tiempo de carga de 2 segundos
    }

    // Renderizado del componente de formulario y resultados
    return (
        <div className="flex justify-center items-center p-2 bg-gray-900 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-lg">
                
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                    className="bg-gray-700 text-white p-2 mb-2 rounded border-none outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <input
                    type="number"
                    value={cellNumber}
                    onChange={(e) => setCellNumber(e.target.value)}
                    placeholder="Número de celular"
                    className="bg-gray-700 text-white p-2 mb-2 rounded border-none outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <label className="flex items-center mb-3 text-white">
                    <input
                        type="checkbox"
                        checked={isArcher}
                        onChange={(e) => setIsArcher(e.target.checked)}
                        className="form-checkbox h-4 w-4 text-blue-500 bg-gray-700 border-none rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2"><FontAwesomeIcon icon={faHand} /> ¿Eres arquero?</span>
                </label>

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 transition-colors duration-300 mb-2"
                >
                    Agregar
                </button>

                {error && <div className="bg-red-500 text-white p-2 rounded mb-2">{error}</div>}
                {successMessage && <div className="bg-green-500 text-white p-2 rounded mb-2">{successMessage}</div>}

                <div className="text-white">
                    <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg">
                        <h2>Próximo Partido</h2>
                        <p>Fecha: {nextGameDate}</p>
                        <p>Hora: 8:30 PM</p>
                        <p>Ubicación: Pista de Santana</p>
                        <p>Días restantes: {daysLeft}</p>
                        <p>Consecutiva: {consecutive}</p>
                    </div>
                </div>

                <div className="flex mt-2">
                    <input
                        type="number"
                        value={userCellNumber}
                        onChange={(e) => setUserCellNumber(e.target.value)}
                        placeholder="Digitar Código"
                        className="bg-gray-700 text-white p-2 rounded-l border-none outline-none focus:ring-2 focus:ring-blue-500 w-80"
                    />
                    <button
                        onClick={() => setShowPlayers(true)}
                        className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 transition-colors duration-300 ml-2 w-full"
                    >
                        Ver Jugadores Registrados
                    </button>
                </div>

                <div className="mt-2">
                    <button
                        onClick={generateGroups}
                        className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600 transition-colors duration-300"
                    >
                        {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Generar equipos'}
                    </button>
                </div>
            </form>

            <div className={`fixed top-0 h-full bg-gray-900 transition-transform transform duration-700 ${showPlayers ? 'translate-x-0' : 'translate-x-full'} w-3/4 p-4 overflow-y-auto sm:w-full`}>
                <h2 className="text-2xl font-bold text-center text-white">Jugadores Registrados</h2>
                <button onClick={() => setShowPlayers(false)} className="bg-red-500 text-white p-2 rounded ml-16">
                    Cerrar
                </button>
                <PersonList persons={persons} deletePerson={handleDeletePerson} updatePerson={handleUpdatePerson} />
            </div>

            {groups.group1.length > 0 && groups.group2.length > 0 && (
                <div className="mt-6 w-full max-w-lg">
                    <Groups groups={groups} />
                </div>
            )}
        </div>
    )
}

export default PersonForm
