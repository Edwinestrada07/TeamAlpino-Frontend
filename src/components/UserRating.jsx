import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faShoePrints, faFutbol } from '@fortawesome/free-solid-svg-icons'

const UserRating = ({ userId, initialRating, initialAttendance = 0, initialGoals = 0, onRated }) => {
    const [rating, setRating] = useState(initialRating)
    const [goals, setGoals] = useState(initialGoals ?? 0)
    const [attendance, setAttendance] = useState(initialAttendance ?? 0)

    // Función para manejar el cambio de calificación
    const handleRatingChange = async (newRating) => {
        // Asegurarse de que previousRating esté definido
        let previousRating = rating // Asignar el valor actual de rating a previousRating

        if (newRating === 1 && rating === 1) {
            setRating(0) // Reiniciar la calificación
    
            try {
                const response = await fetch(`http://localhost:3000/user/${userId}/rating`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ rating: null }), // Enviar null para reiniciar
                })
    
                if (response.ok) {
                    onRated()
                } else {
                    console.error('Error al reiniciar la calificación del jugador:', response.statusText)
                    // Revertir el estado local si hay un error
                    setRating(previousRating)
                }
            } catch (error) {
                console.error('Error al reiniciar la calificación del jugador:', error)
                // Revertir el estado local si hay un error
                setRating(previousRating)
            }
    
            return
        }
    
        // Si no se está reiniciando la calificación
        setRating(newRating)
    
        try {
            const response = await fetch(`https://teamalpinobackend.onrender.com/user/${userId}/rating`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating: newRating }),
            })
    
            if (response.ok) {
                onRated()
            } else {
                console.error('Error al enviar la calificación del jugador:', response.statusText)
                // Revertir el estado local si hay un error
                setRating(previousRating)
            }
        } catch (error) {
            console.error('Error al enviar la calificación del jugador:', error)
            // Revertir el estado local si hay un error
            setRating(previousRating)
        }
    }
    
    // Función para manejar el cambio de goles
    const handleGoalsChange = async (newGoals) => {
        const previousGoals = goals
        setGoals(newGoals)
        try {
            const response = await fetch(`https://teamalpinobackend.onrender.com/user/${userId}/goals`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ goals: newGoals }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Error al actualizar los goles')
            }
            onRated()
        } catch (error) {
            console.error(error)
            setGoals(previousGoals)
        }
    }

    // Función para manejar el cambio de asistencias
    const handleAttendanceChange = async (newAttendance) => {
        const previousAttendance = attendance
        setAttendance(newAttendance)
        try {
            const response = await fetch(`https://teamalpinobackend.onrender.com/user/${userId}/attendance`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ attendance: newAttendance }),
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar las asistencias')
            }
            onRated()
        } catch (error) {
            console.error(error)
            setAttendance(previousAttendance)
        }
    }

    /*useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Usuario no encontrado');
                }
                const data = await response.json();
                setRating(data.rating);
                setAttendance(data.attendance);
                setGoals(data.goals);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);*/

    return (
        <div className="flex flex-col items-center">
            <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon
                        key={star}
                        icon={faStar}
                        className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                        onClick={() => handleRatingChange(star)}
                    />
                ))}
            </div>
            <div className="flex space-x-10 text-sm font-medium mr-5">
                <div className="flex items-center">
                    <FontAwesomeIcon
                        icon={faFutbol}
                        className="cursor-pointer text-gray-400"
                        onClick={() => handleGoalsChange(goals + 1)}
                    />
                    <span className="ml-2">{goals} Goles</span>
                </div>
                <div className="flex items-center">
                    <FontAwesomeIcon
                        icon={faShoePrints}
                        className="cursor-pointer text-gray-400"
                        onClick={() => handleAttendanceChange(attendance + 1)}
                    />
                    <span className="ml-2">{attendance} Asistencias</span>
                </div>
            </div>
        </div>
    )
}

export default UserRating
