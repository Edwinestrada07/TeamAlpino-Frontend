import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShoePrints, faFutbol } from '@fortawesome/free-solid-svg-icons';

const UserRating = ({ userId, initialRating, initialAttendance, initialGoals, onRated }) => {
    const [rating, setRating] = useState(initialRating);
    const [attendance, setAttendance] = useState(initialAttendance);
    const [goals, setGoals] = useState(initialGoals);

    const handleRatingChange = async (newRating) => {
        if (newRating === 1 && rating === 1) {
            setRating(0);

            try {
                const response = await fetch(`http://localhost:3000/user/${userId}/rating`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ rating: null }),
                });

                if (response.ok) {
                    onRated();
                } else {
                    console.error('Error al reiniciar la calificación del jugador:', response.statusText);
                }
            } catch (error) {
                console.error('Error al reiniciar la calificación del jugador:', error);
            }

            return;
        }

        setRating(newRating)

        try {
            const response = await fetch(`http://localhost:3000/user/${userId}/rating`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating: newRating }),
            });

            if (response.ok) {
                onRated();
            } else {
                console.error('Error al enviar la calificación del jugador:', response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar la calificación del jugador:', error);
        }
    };

    const handleAttendanceChange = async (newAttendance) => {
        setAttendance(newAttendance);

        try {
            const response = await fetch(`http://localhost:3000/user/${userId}/attendance`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ attendance: newAttendance }),
            });

            if (response.ok) {
                onRated();
            } else {
                console.error('Error al enviar la asistencia del jugador:', response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar la asistencia del jugador:', error);
        }
    };

    const handleGoalsChange = async (newGoals) => {
        setGoals(newGoals)
    
        try {
            const response = await fetch(`http://localhost:3000/user/${userId}/goals`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ goals: newGoals }), // Asegúrate de enviar los goles correctamente
            });
    
            if (!response.ok) {
                console.error('Error al actualizar los goles:', response.statusText);
            }
        } catch (error) {
            console.error('Error al actualizar los goles:', error);
        }
    };
    

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon
                        key={star}
                        icon={faStar}
                        className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                        onClick={() => handleRatingChange(star)}
                    />
                ))}
            </div>
            <div className="flex space-x-5">
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
                        className={`cursor-pointer ${attendance ? 'text-green-500' : 'text-gray-400'}`}
                        onClick={() => handleAttendanceChange(!attendance)}
                    />
                    <span className="ml-2">Asistencias</span>
                </div>
            </div>
        </div>
    );
};

export default UserRating;
