import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Groups from './components/Groups'
import News from './components/News'
import Reminders from './components/Reminders'

const App = () => {
    const [persons, setPersons] = useState([])
    const [groups, setGroups] = useState({ group1: [], group2: []})

    //useEffect es un Hook en React que te permite realizar efectos secundarios en componentes funcionales
    useEffect(() => {
        //fetchPersons: Es una función asíncrona que realiza una solicitud a la API
        const fetchPersons = async () => {
            const response = await fetch('http://localhost:3000/user') //Realiza una solicitud GET a la URL especificada
            const data = await response.json() // Convierte la respuesta en formato JSON
            setPersons(data) //Actualiza el estado del componente con los datos obtenidos de la API
        }
        fetchPersons //La función fetchPersons se llama inmediatamente después de ser definida, iniciando la solicitud a la API
    }, []) //El segundo argumento de useEffect es una lista de dependencias. Si esta lista está vacía, el efecto solo se ejecutará una vez

    const addPerson = async (name) => {
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: { //Define los encabezados de la solicitud, para indicar que el cuerpo de la solicitud contiene datos en formato JSON
                'Content-Type': 'application/json'    
            },
            body: JSON.stringify({ name }) //Convierte el objeto { name } en una cadena JSON 
        })
        const data = await response.json()
        setPersons([...persons, data]) //es una función de estado que actualiza el estado persons del componente    
    }

    const gnerateGroups = () => {
        const shuffled = [...persons].sort(() => 0.5 - Math.random())
        const group1 = shuffled.slice(0, 7)
        const group2 = shuffled.slice(7, 14)
        setGroups({ group1, group2 }) //Actualiza el estado groups del componente con un objeto que contiene group1 y group2
    }

    return (
        <div className='contsainer mx-auto p-4'>
            <PersonForm addPerson={addPerson}/>
            <PersonList persons={persons}/>
            <button onClick={gnerateGroups} className='bg-blue-500 text-white p-2 rounded'>
                Generar Grupos
            </button>
            <Groups groups={groups}/>
            <News />
            <Reminders />
        </div>
    )
}

export default App
