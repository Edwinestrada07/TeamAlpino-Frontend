import React, { useEffect, useState } from 'react'
import { fetchFromApi } from '../services/api'
import { supabase } from '../services/supabaseClient'

const MyComponent = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetchFromApi('ruta-de-tu-api')
        .then((data) => setData(data))
        .catch((error) => console.error('Error fetching data:', error))
    }, [])

    // Ejemplo de uso de Supabase
    const fetchDataFromSupabase = async () => {
        const { data, error } = await supabase
        .from('User') // Reemplaza 'nombre_de_tu_tabla' con el nombre real de tu tabla
        .select('*')
        if (error) console.error('Error fetching data from Supabase:', error)
        else setData(data)
    }

    useEffect(() => {
        fetchDataFromSupabase()
    }, [])

    return (
        <div>
            {data ? JSON.stringify(data) : 'Cargando datos...'}
        </div>
    )
}

export default MyComponent
