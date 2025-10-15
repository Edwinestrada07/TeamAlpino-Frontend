import { faFutbol, faHand, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import Groups from "./Groups"
import PersonList from "./PersonList"

const authorizedNumbers = ['123', '456'] // Lista de números autorizados para generar equipos (reemplazar con números reales)

const PersonForm = ({ addPerson, persons, deletePerson, updatePerson }) => {
    // Estados locales para el formulario y gestión de datos
    const [name, setName] = useState('')
    const [cellNumber, setCellNumber] = useState('')
    const [positions, setPositions] = useState('')
    const [isArcher, setIsArcher] = useState(false)
    const [error, setError] = useState('')
    const [daysLeft, setDaysLeft] = useState(0)
    const [nextGameDate, setNextGameDate] = useState('')
    const [isLoadingPlayers, setIsLoadingPlayers] = useState(false) // Nuevo estado para la carga de jugadores

    // Estados para la gestión de grupos y visualización de jugadores
    const [showPlayers, setShowPlayers] = useState(false)
    const [groups, setGroups] = useState({ group1: [], group2: [] })
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [userCellNumber, setUserCellNumber] = useState('')

	// 🔄 Nueva función para recargar jugadores al instante
	const fetchPersons = async () => {
		try {
		const response = await fetch('http://localhost:3000/user')
		const data = await response.json()
		updatePerson(null, data, true) // se pasa bandera para indicar actualización total
		} catch (err) {
		console.error('Error al recargar jugadores', err)
		}
	}

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
    const handleSubmit = async (e) => {
		e.preventDefault()
		if (!name || !cellNumber || !positions) {
			setError('Por favor, complete todos los campos.')
			setTimeout(() => setError(''), 2000)
			return
		}

		try {
			await addPerson({ name, cell_number: cellNumber, is_archer: isArcher, positions })
			await fetchPersons()
			setName('')
			setCellNumber('')
			setPositions('')
			setIsArcher(false)
			setSuccessMessage('Jugador registrado con éxito')
			setTimeout(() => setSuccessMessage(''), 3000)
		} catch {
		setError('Error al registrar jugador.')
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
            setError('Error al eliminar jugador.')
            setTimeout(() => setError(''), 3000)
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
            setTimeout(() => setError(''), 3000)
        }
    }

    // Función para generar grupos aleatorios
    const generateGroups = () => {
        /*if (persons.length < 14) {
            setError('No se pueden generar equipos hasta que la lista esté completa con 14 jugadores.')
            setTimeout(() => setError(''), 3000)
            return
        }*/

        if (!authorizedNumbers.includes(userCellNumber)) {
            setError('Código proporcionado sin permisos para generar equipos.')
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
                setTimeout(() => setError(''), 5000)
                return
            }

            const group1 = [arqueros[0], ...otherPlayers.slice(0, 6)]
            const group2 = [arqueros[1], ...otherPlayers.slice(6, 12)]

            setGroups({ group1, group2 })
            setError('')
            setShowPlayers(false)
            setIsLoading(false)
            setSuccessMessage('Equipos generados con éxito')
            setTimeout(() => setSuccessMessage(''), 2000) // Ocultar mensaje de éxito después de 3 segundos
        }, 1000) // Simular tiempo de carga de 2 segundos
    }

    // Función para manejar el botón de ver jugadores registrados
    const handleViewPlayers = async () => {
        setIsLoadingPlayers(true)
        // Simulación de carga; en un caso real, aquí puedes hacer una llamada a la API para obtener los jugadores
        setTimeout(() => {
            setShowPlayers(true)
            setIsLoadingPlayers(false)
        }, 3000) // Simula 3 segundo de tiempo de carga
    }

    // Renderizado del componente de formulario y resultados
    return (
        <div className="bg-mosaic">
            <div className="flex flex-col items-center w-full sm:w-3/4 lg:w-1/2 mx-auto">
            <form onSubmit={handleSubmit} className="bg-gray-900 p-5 rounded-lg shadow-lg w-full max-w-lg">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre Jugador"
                    className="bg-gray-700 text-white p-2 mb-2 rounded border-none outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <input
                    type="number"
                    value={cellNumber}
                    onChange={(e) => setCellNumber(e.target.value)}
                    placeholder="Número Celular"
                    className="bg-gray-700 text-white p-2 mb-2 rounded border-none outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <input
                    type="text"
                    value={positions}
                    onChange={(e) => setPositions(e.target.value)}
                    placeholder="Posición (Ej: Delantero, Defensa...)"
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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 mb-2 rounded-lg transition-all duration-300 flex justify-center items-center gap-2"
                >
                    Agregar Jugador
					<FontAwesomeIcon icon={faFutbol} />
                </button>

                {error && <div className="bg-red-600 text-white p-2 rounded text-center">{error}</div>}
                {successMessage && <div className="bg-green-600 text-white p-2 rounded text-center">{successMessage}</div>}

                <div className="text-white mb-4">
                    <div className="bg-blue-700 text-white p-3 rounded-lg text-center mt-4 shadow">
                        <h3 className="font-bold text-lg">Próximo Partido</h3>
                        <p>Fecha: {nextGameDate}</p>
                        <p>Hora: 8:30 PM</p>
                        <p>Ubicación: Cancha de la patria</p>
                        <p>Días restantes: {daysLeft}</p>
                    </div>
                </div>

                <div className="flex">
                    <input
                        type="password"
                        value={userCellNumber}
                        onChange={(e) => setUserCellNumber(e.target.value)}
                        placeholder="Ingrese Código"
                        className="bg-gray-700 text-white p-2 rounded-l border-none outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <button
                        onClick={handleViewPlayers}
                        className="bg-blue-700 text-white p-2 rounded-r hover:bg-blue-600 transition-colors duration-300 ml-2 w-full"
                    >    
                        <p>Jugadores Registrados</p>

                        {isLoadingPlayers && (
                            <p>
                                Cargando... <FontAwesomeIcon icon={faSpinner} spin />
                            </p>
                        )}
                    </button>
                </div>

                <div className="mt-2 w-full">
                    <button
                        onClick={generateGroups}
                        className="bg-green-600 text-white p-2 rounded w-full hover:bg-green-600 transition-colors duration-300"
                    >
                        {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Ingrese el código para generar los equipos'}
                    </button>
                </div>
            </form>

            <div className={`fixed top-0 h-full w-full bg-gray-900 transition-transform transform duration-700 ${showPlayers ? 'translate-x-0' : 'translate-x-full'} w-3/4 p-4 overflow-y-auto sm:w-full`}>
                <h2 className="text-2xl font-bold text-center text-white">Jugadores Registrados</h2>
                <button onClick={() => setShowPlayers(false)} className="bg-red-500 text-white p-2 rounded ml-5 mt-3">
                    Cerrar
                </button>
                <PersonList persons={persons} deletePerson={handleDeletePerson} updatePerson={handleUpdatePerson} />
            </div>

            {groups.group1.length > 0 && groups.group2.length > 0 && (
                <div className="mt-6 w-full">
                    <Groups groups={groups} />
                </div>
            )}
        </div>
        </div>
        
    )
}

export default PersonForm

//https://teamalpino-backend.onrender.com/user/david