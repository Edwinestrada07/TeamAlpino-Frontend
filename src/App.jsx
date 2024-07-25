import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol } from '@fortawesome/free-solid-svg-icons'

import PersonForm from './components/PersonForm'
import Sidebar from './components/Sidebar'
import Groups from './components/Groups'

import UserProfile from './pages/UserProfile'
import Uniforms from './pages/Uniforms'
import Statistics from './pages/Statistics'
import News from './pages/News'
import PaymentMethods from './pages/PaymentMethods'

const App = () => {
    const [persons, setPersons] = useState([])
    const [error, setError] = useState('')

    // useEffect es un Hook en React que te permite realizar efectos secundarios en componentes funcionales
    useEffect(() => {
        // fetchPersons: Es una función asíncrona que realiza una solicitud a la API
        const fetchPersons = async () => {
            try {
                const response = await fetch('https://teamalpino-backend.onrender.com/user') // Realiza una solicitud GET a la URL especificada
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue correcta')
                }
                const data = await response.json() // Convierte la respuesta en formato JSON
                setPersons(data) // Actualiza el estado del componente con los datos obtenidos de la API
            } catch (error) {
                console.error('Error al buscar jugadores:', error)
                setError('Error al buscar jugadores.')
            }
        }
        fetchPersons() // La función fetchPersons se llama inmediatamente después de ser definida, iniciando la solicitud a la API
    }, []) // El segundo argumento de useEffect es una lista de dependencias. Si esta lista está vacía, el efecto solo se ejecutará una vez

    // Función para agregar una persona
    const addPerson = async (person) => {
        try {
            const response = await fetch('https://teamalpino-backend.onrender.com/user', {
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
            setPersons((prevPersons) => [...prevPersons, data]) // Actualiza el estado persons del componente
            setError('')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 flex-col justify-center items-center min-h-screen bg-gray-800 ml-16 transition-margin duration-300">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div className="container mx-auto p-2 bg-gray-800 rounded-lg">
                                    <h1 className="text-2xl font-bold text-center text-white mb-1">
                                        <FontAwesomeIcon icon={faFutbol} className="" /> Lista de Jugadores Lpino
                                    </h1>
                                    <PersonForm addPerson={addPerson} persons={persons} />
                                </div>
                            }
                        />
                        <Route path="/" exact component={PersonForm} />
                        <Route path="/groups" component={Groups} />
                        
                        <Route path="/userprofile" element={<UserProfile />} />
                        <Route path="/uniforms" element={<Uniforms />} />      
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/paymentsmethods" element={<PaymentMethods />} />
                        {/* Añade otras rutas aquí */}
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App
