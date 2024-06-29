import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const UserRating = ({ userId, initialRating, onRated }) => {
    const [rating, setRating] = useState(initialRating)

    // Función para manejar el cambio de calificación
    const handleRatingChange = async (newRating) => {
        // Si se hace doble clic en la primera estrella, reiniciar la calificación
        if (newRating === 1 && rating === 1) {
            // Enviar un valor especial para indicar reinicio en la base de datos
            setRating(0) // Reinicia la calificación a 0 en el cliente

            try {
                const response = await fetch(`http://localhost:3000/user/${userId}/rating`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ rating: null }), // Envía null para reiniciar en la base de datos
                })

                if (response.ok) {
                    onRated(); // Llama a la función proporcionada cuando se califica correctamente
                } else {
                    console.error('Error al reiniciar la calificación del jugador:', response.statusText)
                }
            } catch (error) {
                console.error('Error al reiniciar la calificación del jugador:', error)
            }

            return
        }

        setRating(newRating) // Establece la nueva calificación normalmente

        try {
            const response = await fetch(`http://localhost:3000/user/${userId}/rating`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating: newRating }), // Envía la nueva calificación al servidor
            });

            if (response.ok) {
                onRated() // Llama a la función proporcionada cuando se califica correctamente
            } else {
                console.error('Error al enviar la calificación del jugador:', response.statusText)
            }
        } catch (error) {
            console.error('Error al enviar la calificación del jugador:', error)
        }
    }

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                    onClick={() => handleRatingChange(star)}
                />
            ))}
        </div>
    )
}

export default UserRating

