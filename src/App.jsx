import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PersonForm from './components/PersonForm'

import Sidebar from './components/Sidebar'

import News from './pages/News'
import Uniforms from './pages/Uniforms'
import PaymentMethods from './pages/PaymentMethods'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol } from '@fortawesome/free-solid-svg-icons'
import Statistics from './pages/Statistics'



const App = () => {
    const [persons, setPersons] = useState([])
    
    const [error, setError] = useState('')
    
    
    
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

    

    
    
    // Funcionalidad para guardar y cargar datos desde el local storage
    /*useEffect(() => {
        const storedPersons = JSON.parse(localStorage.getItem('persons'))
        if (storedPersons) {
            setPersons(storedPersons)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('persons', JSON.stringify(persons))
    }, [persons])*/

    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 flex flex-col justify-center items-center min-h-screen bg-gray-800 ml-16 transition-margin duration-300">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div className="container mx-auto p-3 bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-3/4">
                                    {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}

                                    <h1 className="text-3xl font-bold text-center text-white mb-6">
                                        <FontAwesomeIcon icon={faFutbol} className="mr-2 text-2xl" /> Lista de Jugadores Lpino
                                    </h1>

                                    <PersonForm addPerson={addPerson} persons={persons} />

                                    

                                    

                                    

                                    {error && <div className="bg-red-500 text-white p-2 rounded mt-4 text-center w-full">{error}</div>}

                                    

                                    
                                </div>
                            }
                        />
                        <Route path="/statistics" element={<Statistics />} />
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