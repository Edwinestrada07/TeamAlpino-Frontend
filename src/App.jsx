import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Groups from './components/Groups'
import Reminders from './components/Reminders'
import Sidebar from './components/Sidebar'

import News from './pages/News'
import Uniforms from './pages/Uniforms'
import PaymentMethods from './pages/PaymentMethods'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol, faSpinner } from '@fortawesome/free-solid-svg-icons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [groups, setGroups] = useState({ group1: [], group2: [] })
    const [error, setError] = useState('')
    const [showPlayers, setShowPlayers] = useState(false) // Estado para controlar la visibilidad del panel
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    
    //useEffect es un Hook en React que te permite realizar efectos secundarios en componentes funcionales
    useEffect(() => {
        //fetchPersons: Es una función asíncrona que realiza una solicitud a la API
        const fetchPersons = async () => {
            try {
                const response = await fetch('http://localhost:3000/user') // Realiza una solicitud GET a la URL especificada
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue correcta')
                }
                const data = await response.json() // Convierte la respuesta en formato JSON
                setPersons(data) // Actualiza el estado del componente con los datos obtenidos de la API
            } catch (error) {
                console.error('Error al buscar jugador:', error)
            }  
        }
        fetchPersons() //La función fetchPersons se llama inmediatamente después de ser definida, iniciando la solicitud a la API
    }, []) //El segundo argumento de useEffect es una lista de dependencias. Si esta lista está vacía, el efecto solo se ejecutará una vez

    const addPerson = async (person) => {
        try {
            const response = await fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: { // Define los encabezados de la solicitud, para indicar que el cuerpo de la solicitud contiene datos en formato JSON
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(person) // Convierte el objeto person en una cadena JSON 
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Error al agregar el usuario.')
            }

            const data = await response.json()
            setPersons((prevPersons) => [...prevPersons, data]) // Es una función de estado que actualiza el estado persons del componente
            setError('')
        } catch (error) {
            setError(error.message)
        } 
    }

    const deletePerson = async (id) => {
        await fetch(`http://localhost:3000/user/${id}`,{
            method: 'DELETE',
        })
        setPersons((prevPersons) => prevPersons.filter(person => person.id !== id))
    }

    const updatePerson = async (id, updatePerson) => {
        try {
            const response = await fetch(`http://localhost:3000/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatePerson)
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Error al actualizar el usuario.')
            }

            const data = await response.json()
            setPersons((prevPersons) => prevPersons.map(person => person.id === id ? data : person))  
            setError('')
        } catch (error) {
            setError(error.message)
        }
    }

    /*const toggleStatus = async (id) => {
        if (!id) {
            console.error('ID is undefined or invalid')
            return
        }
    
        const person = persons.find((person) => person.id === id)
        if (!person) {
            console.error('Person not found')
            return
        }
    
        const updatedStatus = person.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
        const updatedPerson = { ...person, status: updatedStatus }
    
        await updatePerson(id, updatedPerson)
    }*/

    const generateGroups = () => {
        setIsLoading(true)
        setSuccessMessage('')
        setTimeout(() => {
            const shuffled = [...persons].sort(() => 0.5 - Math.random())
            const arqueros = shuffled.filter(person => person.is_archer)
            const otherPlayers = shuffled.filter(person => !person.is_archer)

            if (arqueros.length < 2) {
                setError('Debe haber al menos dos arqueros.')
                setIsLoading(false)
                return
            }

            const group1 = [arqueros[0], ...otherPlayers.slice(0, 6)]
            const group2 = [arqueros[1], ...otherPlayers.slice(6, 12)]

            setGroups({ group1, group2 })
            setError('')
            setShowPlayers(false) // Cerrar el panel deslizante
            setIsLoading(false)
            setSuccessMessage('Equipos generados con éxito')
            setTimeout(() => setSuccessMessage(''), 3000) // Ocultar el mensaje después de 3 segundos
        }, 2000) // Simular un tiempo de carga de 2 segundos
    }
    
    // Funcionalidad para guardar y cargar datos desde el local storage
    useEffect(() => {
        const storedPersons = JSON.parse(localStorage.getItem('persons'))
        if (storedPersons) {
            setPersons(storedPersons)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('persons', JSON.stringify(persons))
    }, [persons])

    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 flex justify-center items-center min-h-screen bg-gray-800 ml-16 transition-margin duration-300">
                    <Routes>
                        <Route path="/" element={
                            <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-3/4">
                                {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
                
                                <h1 className="text-3xl font-bold text-center text-white mb-6">
                                    <FontAwesomeIcon icon={faFutbol} className="mr-2" /> Lista de Jugadores Lpino
                                </h1>
                                
                                <PersonForm addPerson={addPerson} persons={persons} />

                                <button onClick={() => setShowPlayers(!showPlayers)} className="bg-blue-500 text-white p-3 m-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                                    {showPlayers ? 'Ocultar Jugadores Registrados' : 'Visualizar Jugadores Registrados'}
                                </button>

                                <div
                                    className={`fixed top-0 right-0 h-full bg-gray-900 transition-transform transform duration-700 ${
                                        showPlayers ? 'translate-x-0' : 'translate-x-full'
                                    } w-3/4 p-4 overflow-y-auto sm:w-full`}
                                    style={{ zIndex: 1000 }}
                                >
                                    <h2 className="text-xl font-bold text-center text-white">Jugadores Registrados</h2>
                                    <button onClick={() => setShowPlayers(false)} className="bg-red-500 text-white p-2 rounded ">
                                        Cerrar
                                    </button>
                                    <PersonList 
                                        persons={persons} 
                                        deletePerson={deletePerson} 
                                        updatePerson={updatePerson} 
                                    />

                                    <div className="flex justify-center mt-6">
                                        <button onClick={generateGroups} className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                                            {isLoading ? (
                                                <FontAwesomeIcon icon={faSpinner} spin />
                                            ) : (
                                                'Generar Equipos'
                                            )}
                                        </button>
                                    </div>
                                </div>
                                
                                {successMessage && <div className="bg-green-500 text-white p-2 rounded mt-4 text-center">{successMessage}</div>}
                                <Groups groups={groups} />
                            
                                <Reminders />
                            </div>
                        } />
                        <Route path="/news" element={<News />} />
                        <Route path="/uniforms" element={<Uniforms />} />
                        <Route path="/paymentsmethods" element={<PaymentMethods />} />
                        {/* Añade otras rutas aquí */}
                    </Routes>
                </div>
            </div>
        </Router>
    )
    
}

export default App