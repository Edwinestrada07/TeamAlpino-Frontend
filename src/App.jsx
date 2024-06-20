import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Groups from './components/Groups'
import News from './components/News'
import Reminders from './components/Reminders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol } from '@fortawesome/free-solid-svg-icons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [groups, setGroups] = useState({ 
        group1: [], group2: [] 
    })
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
        const shuffled = [...persons].sort(() => 0.5 - Math.random())
        const arqueros = shuffled.filter(person => person.is_archer)
        const otherPlayer = shuffled.filter(person => !person.is_archer)

        if (arqueros.length < 2) {
            setError('Debe inscribir al menos dos arqueros')
            return
        }

        const group1 = [arqueros[0], ...otherPlayer.slice(0, 6)]
        const group2 = [arqueros[1], ...otherPlayer.slice(6, 12)]
        setGroups({ group1, group2 })
        setError('')
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
        <div className="container mx-auto p-4">
            {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}

            <h1 className="font-bold"> <FontAwesomeIcon icon={faFutbol} /> Lista de Jugadores Lpino</h1>
            <PersonForm addPerson={addPerson} persons={persons} />
            <PersonList 
                persons={persons}
                deletePerson={deletePerson}
                updatePerson={updatePerson}   
            />
            <button onClick={generateGroups} className="bg-blue-500 text-white p-2 rounded justify-center">
                Generar Equipos
            </button>
            <Groups groups={groups}/>
            <News />
            <Reminders />
        </div>
    )
}

export default App