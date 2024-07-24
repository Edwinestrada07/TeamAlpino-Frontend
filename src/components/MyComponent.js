import { useEffect, useState } from 'react'
import { fetchFromApi } from '../services/api'
import { supabase } from '../services/supabaseClient'

const MyComponent = () => {
    const [apiData, setApiData] = useState(null)
    const [supabaseData, setSupabaseData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const data = await fetchFromApi('user') // Ajustamos el endpoint a 'user'
                setApiData(data)
            } catch (error) {
                console.error('Error al obtener datos de la API:', error)
                setError('Error al obtener datos de la API')
            }
        }
        fetchDataFromApi()
    }, [])

    const fetchDataFromSupabase = async () => {
        const { data, error } = await supabase
            .from('Users') // Reemplaza 'Users' con el nombre real de tu tabla
            .select('*')
        if (error) {
            console.error('Error al recuperar datos de Supabase:', error)
            setError('Error al recuperar datos de Supabase')
        } else {
            setSupabaseData(data)
        }
    }

    useEffect(() => {
        fetchDataFromSupabase()
    }, [])

    return (
        <div>
            {error && <p>{error}</p>}
            <h2>Datos de la API:</h2>
            {apiData ? <pre>{JSON.stringify(apiData, null, 2)}</pre> : 'Cargando datos de la API...'}

            <h2>Datos de Supabase:</h2>
            {supabaseData ? <pre>{JSON.stringify(supabaseData, null, 2)}</pre> : 'Cargando datos de Supabase...'}
        </div>
    )
}

export default MyComponent


