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
            setSuccessMessage('Jugador registrado con éxito')
            setTimeout(() => setSuccessMessage(''), 3000) // Ocultar mensaje de éxito después de 3 segundos
            setConsecutive(consecutive + 1)
        } else {
            setError('Por favor complete todos los campos.')
        }
    }

    // Función para eliminar una persona por su ID
    const handleDeletePerson = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/user/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Error al eliminar la persona.')
            }

            deletePerson(id)
            setError('')
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
            try {
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
                setSuccessMessage('Equipos generados con éxito')
                setTimeout(() => setSuccessMessage(''), 3000) // Ocultar mensaje de éxito después de 3 segundos
            } catch (error) {
                setError('Error al generar los equipos.')
            } finally {
                setIsLoading(false)
            }
        }, 2000) // Simular tiempo de carga de 2 segundos
    }

    // Renderizado del componente de formulario y resultados
    return (
        <div className="flex justify-center items-center p-6 bg-gray-900 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-100">
                {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
                {successMessage && <div className="bg-green-500 text-white p-2 rounded mb-4">{successMessage}</div>}

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                    className="bg-gray-700 text-white p-3 mb-3 rounded border-none outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <input
                    type="number"
                    value={cellNumber}
                    onChange={(e) => setCellNumber(e.target.value)}
                    placeholder="Número de celular"
                    className="bg-gray-700 text-white p-3 mb-3 rounded border-none outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <label className="flex items-center mb-3 text-white">
                    <input
                        type="checkbox"
                        checked={isArcher}
                        onChange={(e) => setIsArcher(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-blue-500 bg-gray-700 border-none rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2"><FontAwesomeIcon icon={faHand} />¿Eres arquero?</span>
                </label>

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 transition-colors duration-300"
                >
                    Agregar
                </button>

                <div className="mt-4 text-white">
                    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg text-lg font-bold">
                        <h2>Próximo Partido</h2>
                        <p>Fecha: {nextGameDate}</p>
                        <p>Hora: 8:30 PM</p>
                        <p>Ubicación: Cancha La Patria</p>
                        <p>Número partido: # {consecutive}</p>
                        <p>Faltan {daysLeft} días</p>
                    </div>
                </div>

                <div className={`fixed top-0 right-1 h-full bg-gray-900 transition-transform transform duration-700 ${showPlayers ? 'translate-x-0' : 'translate-x-full'} w-3/4 p-4 overflow-y-auto sm:w-full`}>
                    <h2 className="text-xl font-bold text-center text-white">Jugadores Registrados</h2>
                    <button onClick={() => setShowPlayers(false)} className="bg-red-500 text-white p-2 rounded">
                        Cerrar
                    </button>
                    <PersonList persons={persons} deletePerson={handleDeletePerson} updatePerson={handleUpdatePerson} />
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center mb-4">
                    <button
                        onClick={() => {
                            try {
                                setShowPlayers(!showPlayers)
                                setSuccessMessage('Jugadores mostrados con éxito')
                                setTimeout(() => setSuccessMessage(''), 3000) // Ocultar mensaje de éxito después de 3 segundos
                            } catch (error) {
                                setError('Error al mostrar los jugadores registrados.')
                            }
                        }}
                        className="bg-blue-500 text-white p-2 m-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        {showPlayers ? 'Ocultar Jugadores Registrados' : 'Visualizar Jugadores Registrados'}
                    </button>
                    <button
                        onClick={() => setShowVerificationInput(true)}
                        className="bg-green-500 text-white p-2 m-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        {isLoading ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                            'Generar Equipos'
                        )}
                    </button>
                </div>

                {showVerificationInput && (
                    <div className="flex flex-col sm:flex-row justify-center items-center mt-4 mb-4">
                        <input
                            type="text"
                            value={userCellNumber}
                            onChange={(e) => setUserCellNumber(e.target.value)}
                            placeholder="Ingrese Autorización"
                            className="bg-gray-700 text-white p-2 rounded-lg mb-2 sm:mb-0 sm:mr-2"
                        />
                        <button
                            onClick={generateGroups}
                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                        >
                            Verificar y Generar Equipos
                        </button>
                    </div>
                )}

                <Groups groups={groups} />
            </form>
        </div>
    )
}

export default PersonForm
